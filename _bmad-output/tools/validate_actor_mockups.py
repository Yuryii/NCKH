#!/usr/bin/env python3
"""Structural, authorization and workflow validator for generated actor mockups."""

from __future__ import annotations

import importlib.util
import json
import re
import shutil
import subprocess
import sys
import tempfile
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag

ROOT = Path(__file__).resolve().parents[2]
MOCKUPS = ROOT / "_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups"
GENERATOR = Path(__file__).with_name("generate_actor_mockups.py")
sys.dont_write_bytecode = True


def load_generator():
    spec = importlib.util.spec_from_file_location("actor_generator", GENERATOR)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader
    spec.loader.exec_module(module)
    return module


def runtime_browser_errors():
    """Execute critical P.KHCN state sequences in a real browser DOM."""
    candidates = [
        shutil.which("msedge"), shutil.which("microsoft-edge"), shutil.which("chromium"), shutil.which("google-chrome"),
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]
    browser = next((Path(item) for item in candidates if item and Path(item).exists()), None)
    if not browser:
        return ["runtime DOM sequence validator requires Edge/Chromium"]
    cases = {
        "council": "04-hoi-dong-readiness.html",
        "documents": "06-tai-lieu-buoc-03-07.html",
        "meeting-result": "05-cuoc-hop-ket-qua.html",
        "meeting-replace": "05-cuoc-hop-ket-qua.html",
        "cancel": "03-de-tai-va-huy.html",
        "round": "02-quan-ly-dot.html",
        "audit": "07-audit-nghiep-vu.html",
    }
    errors = []
    with tempfile.TemporaryDirectory(prefix="nckh-pk-runtime-") as temp_dir:
        for scenario, filename in cases.items():
            url = (MOCKUPS / "p-khcn" / filename).resolve().as_uri() + f"?runtime-self-test={scenario}"
            command = [str(browser), "--headless=new", "--disable-gpu", "--no-first-run", "--disable-background-networking", f"--user-data-dir={Path(temp_dir) / scenario}", "--dump-dom", url]
            try:
                completed = subprocess.run(command, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=20)
            except (OSError, subprocess.TimeoutExpired) as exc:
                errors.append(f"runtime {scenario}: browser execution failed: {exc}")
                continue
            match = re.search(r'<meta name="runtime-selftest" content="([^"]+)">', completed.stdout)
            if completed.returncode or not match:
                errors.append(f"runtime {scenario}: self-test result missing (exit {completed.returncode})")
            elif match.group(1) != "pass":
                errors.append(f"runtime {scenario}: {match.group(1)}")
    return errors


class Doc(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.ids = []
        self.links = []
        self.assets = []
        self.inputs = []
        self.labels = []
        self.buttons = []
        self.body = {}
        self.text_parts = []
        self.records = []
        self._record = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "body":
            self.body = attrs
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag in {"link", "script"}:
            target = attrs.get("href") or attrs.get("src")
            if target:
                self.assets.append(target)
        if tag == "input":
            self.inputs.append(attrs)
        if tag == "label":
            self.labels.append(attrs)
        if tag == "button":
            self.buttons.append(attrs)
        if "data-record" in attrs:
            self._record = {"attrs": attrs, "text": []}
            self.records.append(self._record)

    def handle_endtag(self, tag):
        if tag == "article" and self._record is not None:
            self._record = None

    def handle_data(self, data):
        value = data.strip()
        if value:
            self.text_parts.append(value)
            if self._record is not None:
                self._record["text"].append(value)

    @property
    def text(self):
        return " ".join(self.text_parts)

    def attr_nodes(self, name, value=None):
        return [(tag, attrs) for tag, attrs in self.tags if name in attrs and (value is None or attrs[name] == value)]


def parse(path):
    doc = Doc()
    doc.feed(path.read_text(encoding="utf-8"))
    return doc


def main():
    gen = load_generator()
    errors = list(gen.validate_model())
    canonical_codes = {f"GV-{i:02d}" for i in range(1, 15)} | {f"TD-{i:02d}" for i in range(1, 7)} | {f"PK-{i:02d}" for i in range(1, 24)} | {f"CT-{i:02d}" for i in range(1, 9)} | {f"TV-{i:02d}" for i in range(1, 7)} | {f"TK-{i:02d}" for i in range(1, 7)} | {f"QT-{i:02d}" for i in range(1, 7)}
    schema_codes = {code for page in gen.PAGES for code in page["codes"]}
    if schema_codes != canonical_codes:
        errors.append(f"schema differs from canonical Atlas code set: missing={sorted(canonical_codes-schema_codes)}, extra={sorted(schema_codes-canonical_codes)}")
    allowed_uploads = {
        "gv": {"none", "signed-pdf", "owner-evidence"}, "td": {"none", "unit-signed-pdf"},
        "pk": {"none", "pk-official"}, "ct": {"none", "own-ballot", "chair-second-signature"},
        "tv": {"none", "own-ballot"}, "tk": {"none", "secretary-minutes"}, "qt": {"none"},
    }
    for page in gen.PAGES:
        if page["upload"] not in allowed_uploads[page["actor"]]:
            errors.append(f"{page['actor']}/{page['filename']}: upload mode outside independent role allowlist")
    expected_pages = {(gen.ACTORS[p["actor"]][0], p["filename"]): p for p in gen.PAGES if p["actor"] != "gv"}
    generated = []
    for folder, *_ in gen.ACTORS.values():
        generated.extend((MOCKUPS / folder).glob("*.html"))
    if len(generated) != 53:
        errors.append(f"expected 53 actor HTML pages, got {len(generated)}")

    seen_codes = []
    for legacy in sorted(gen.LECTURER_OLD_FILES):
        if (MOCKUPS / "giang-vien" / legacy).exists():
            errors.append(f"legacy lecturer page still exists: giang-vien/{legacy}")
    required_branches = {
        "GV-07": {"approve", "return"}, "TD-03": {"approve", "return"}, "TD-04": {"sign-route", "return"},
        "PK-07": {"approve-cancel", "reject-cancel"}, "PK-12": {"cancel-meeting", "replace-meeting"},
        "PK-13": {"end"}, "PK-14": {"publish"}, "PK-15": {"adjust"},
        "PK-16": {"publish-bm05"}, "PK-17": {"accept-bm08"}, "PK-18": {"return-bm09", "refresh-bm09", "accept-bm09"},
        "PK-19": {"publish-bm10"}, "PK-20": {"confirm-bm13", "return-bm13"}, "PK-21": {"store-bm14", "mark-bm14-na"},
        "PK-22": {"complete-step07"}, "CT-06": {"return", "approve"}, "CT-07": {"second-signature"},
        "CT-05": {"preview", "export", "submit-ballot"}, "TV-05": {"preview", "export", "submit-ballot"},
        "TK-05": {"preview", "export", "submit-minutes", "resubmit-minutes"}, "QT-03": {"approve", "reject"},
        "QT-05": {"lock", "unlock", "password-reset"},
    }
    required_fields = {
        "GV-04": {"topic", "field", "team-1-name", "team-1-email", "team-1-role", "team-2-name", "team-2-email", "team-2-role", "team-unit", "objective", "products"},
        "PK-02": {"round-name", "round-description", "round-type", "round-direct-topics", "round-start", "round-end"},
        "PK-07": {"cancel-snapshot-version", "cancel-current-stage"},
        "PK-08": {"council-stage", "council-input", "council-decision", "council-chair", "council-secretary", "council-members"},
        "PK-16": {"pk-bm05-attestation", "pk-bm10-attestation", "pk-bm14-attestation", "bm14-contract-applicability"},
        "CT-05": {"ct-ballot-stage", "ct-ballot-kind", "ct-score", "ct-comment"}, "TV-05": {"tv-ballot-stage", "tv-ballot-kind", "tv-score", "tv-comment"},
        "TK-05": {"minutes-stage", "minutes-kind", "minutes-scenario", "meeting-date", "meeting-time", "meeting-place", "minutes-conclusion"},
        "QT-04": {"pk-name", "pk-email", "pk-code"},
    }
    reason_branches = {"reject", "return", "cancel-request", "approve-cancel", "reject-cancel", "cancel-meeting", "adjust", "return-bm09", "return-bm13", "lock"}
    irreversible_pk_actions = {"publish-round", "open-meeting", "end-meeting", "publish-result", "publish-bm05", "publish-bm10", "store-bm14", "mark-bm14-na", "complete-step07"}

    for path in sorted(generated):
        rel = path.relative_to(MOCKUPS)
        if rel.parts[0] == "giang-vien":
            expected_lecturer = set(gen.LECTURER_PAGE_CODES)
            if rel.name not in expected_lecturer:
                errors.append(f"unexpected lecturer clone page: {rel}")
                continue
            doc = parse(path)
            raw = path.read_text(encoding="utf-8")
            codes = doc.body.get("data-page-codes", "").split()
            expected_codes_for_page = gen.LECTURER_PAGE_CODES[rel.name]
            seen_codes.extend(codes)
            if doc.body.get("data-actor") != "gv" or codes != expected_codes_for_page:
                errors.append(f"{rel}: lecturer actor/code mapping differs; expected {expected_codes_for_page}, got {codes}")
            if len(doc.ids) != len(set(doc.ids)):
                errors.append(f"{rel}: duplicate id(s)")
            if not doc.attr_nodes("lang", "vi"):
                errors.append(f"{rel}: missing vi language")
            for target in doc.assets + doc.links:
                if target.startswith(("http:", "https:", "mailto:", "data:", "#")):
                    continue
                clean, _ = urldefrag(target)
                if clean and not (path.parent / clean).resolve().exists():
                    errors.append(f"{rel}: broken local reference {target}")
            if "lecturer.css" not in doc.assets or "lecturer.js" not in doc.assets:
                errors.append(f"{rel}: lecturer page must use lecturer.css/js cloned assets")
            if "shared/actor" in raw or "student.css" in raw or "student.js" in raw:
                errors.append(f"{rel}: lecturer page drifted to shared/student runtime assets")
            if "@sv.dntu.edu.vn" in raw:
                errors.append(f"{rel}: student email domain leaked into lecturer suite")
            if rel.name == "03-bm01a-ho-so.html":
                if "BM01A" not in raw or "Trưởng đơn vị" not in raw:
                    errors.append(f"{rel}: missing BM01A/unit-head route")
                if "data-advisor-section" in raw or "data-advisor-check" in raw or "Giảng viên hướng dẫn" in raw:
                    errors.append(f"{rel}: own BM01A must not render advisor selection/gate")
                if re.search(r"\b(Điểm|điểm số|phiếu Hội đồng)\b", raw):
                    errors.append(f"{rel}: own BM01A leaked scoring/council content")
                required_ids = {"topic-name", "research-field", "objective", "importance", "expected-products", "research-content", "duration", "budget", "application-effect"}
                actual_required = {attrs.get("id") for _, attrs in doc.attr_nodes("data-bm01-required") if "required" in attrs}
                if required_ids - actual_required:
                    errors.append(f"{rel}: missing required BM01A fields {sorted(required_ids-actual_required)}")
                for token in ("data-required-check", "data-eligibility-check", "data-route-check", "accept=\"application/pdf,.pdf\""):
                    if token not in raw:
                        errors.append(f"{rel}: missing BM01A validation token {token}")
            if rel.name == "03b-bm01a-truong-don-vi-tra.html":
                if "Sửa và nộp lại BM01A" not in raw or "Hồ sơ thay thế" in raw:
                    errors.append(f"{rel}: returned BM01A must resubmit a version, not create replacement application")
                for forbidden in ("HS-GV-2026-032", "Hồ sơ mới", "từ chối ký", "cần thay thế"):
                    if forbidden.lower() in raw.lower():
                        errors.append(f"{rel}: inconsistent returned semantics leaked: {forbidden}")
                if "#nop-lai-HS-GV-2026-031" not in raw or "V2 giữ cùng mã Hồ sơ" not in raw:
                    errors.append(f"{rel}: resubmit must target V2 on HS-GV-2026-031")
            if rel.name == "10-xet-duyet-ho-so-sinh-vien.html":
                for token in ("Chỉ hiển thị Hồ sơ BM01B được phân công", "approve-student-application", "return-student-application", "Lý do trả hồ sơ là bắt buộc", "data-signed-bm01b", "BM01B-HS-SV-2026-044-V1.pdf", "download-student-bm01", "ui.openDialog", "ui.showToast"):
                    if token not in raw:
                        errors.append(f"{rel}: missing assigned-student review behavior: {token}")
                if re.search(r"\b(confirm|prompt|alert)\s*\(", raw):
                    errors.append(f"{rel}: native confirm/prompt/alert must not implement review decisions")
                if "Bạn không thể truy cập nội dung này" in raw:
                    errors.append(f"{rel}: assigned review page must not embed denied-state markup")
                if 'href="10-xet-duyet-ho-so-sinh-vien.html">Xét hồ sơ' not in raw or 'nav-item active" href="10-xet-duyet-ho-so-sinh-vien.html">Xét hồ sơ' not in raw:
                    errors.append(f"{rel}: review must use the separate active Xét hồ sơ navigation")
            if rel.name == "01-danh-sach-de-tai.html":
                for token in ('<strong>5</strong><span>Tổng số đề tài', '<strong>2</strong><span>Cần bạn xử lý', 'tab-count">2</span>'):
                    if token not in raw:
                        errors.append(f"{rel}: lecturer list counter/filter mismatch: {token}")
                if 'Hồ sơ Sinh viên được phân công' in raw or 'data-relation="advisor"' in raw:
                    errors.append(f"{rel}: lecturer project list must not include student-review assignments")
            if rel.name == "02-dot-dang-ky.html" and ("ĐK-SV" in raw or "ĐK-GV-2026-01" not in raw):
                errors.append(f"{rel}: lecturer round must use ĐK-GV identifier")
            if rel.name == "02-dot-dang-ky.html":
                for token in ('id="round-filters"', 'id="round-search"', 'id="round-status"', 'data-round-status="open"', 'data-round-status="upcoming"', 'data-round-status="closed"', 'id="round-empty"', 'function filterRounds'):
                    if token not in raw:
                        errors.append(f"{rel}: missing lecturer round filtering token {token}")
            if rel.name == "04-chi-tiet-de-tai.html":
                for token in ("HS-GV-2026-031", "Mô hình gợi ý tài liệu học tập theo năng lực", "Bạn là Chủ nhiệm đề tài", "Chờ Trưởng đơn vị · Bước 01", "BM01A — Hồ sơ đăng ký"):
                    if token not in raw:
                        errors.append(f"{rel}: inconsistent HS-GV-2026-031 detail fixture {token}")
                for forbidden in ("NCKH-GV-2025-066", "BM09 — Báo cáo nghiệm thu", "Bước 06<br>Nghiệm thu</li><li class=\"step active\""):
                    if forbidden in raw:
                        errors.append(f"{rel}: stale detail fixture leaked {forbidden}")
            if rel.name == "06-workspace-buoc-03-07.html":
                for token in ("Bạn là Chủ nhiệm đề tài", "dataset.activeDocument", "bm09Active", "uploadAction.hidden"):
                    if token not in raw and token not in (MOCKUPS / "giang-vien/lecturer.js").read_text(encoding="utf-8"):
                        errors.append(f"{rel}: workspace BM09 permission/gate missing {token}")
            if rel.name == "09-ho-so-ca-nhan.html":
                for token in ("lan.nguyen@dntu.edu.vn", "Đơn vị", "Chức danh", "Chuyên môn"):
                    if token not in raw:
                        errors.append(f"{rel}: missing lecturer profile fixture {token}")
                if "@sv.dntu.edu.vn" in raw or ">Khóa học<" in raw or ">Lớp<" in raw:
                    errors.append(f"{rel}: student-only profile fixture leaked")
            if rel.name == "07-ket-qua-hoan-tat.html":
                if "#chua-cong-bo" in raw or "data-unpublished-result" in raw or "KẾT QUẢ CHƯA CÔNG BỐ" in raw:
                    errors.append(f"{rel}: published page must not embed unpublished-state markup")
            if rel.name == "07b-ket-qua-chua-cong-bo.html":
                for forbidden in ("KẾT LUẬN NGHIỆM THU", ">Đạt<", "BM12", "BM13", "BM14", "NCKH-GV-", "HS-GV-", "V1 · Hiện hành"):
                    if forbidden in raw:
                        errors.append(f"{rel}: sensitive published result leaked: {forbidden}")
            if rel.name == "10b-xet-duyet-khong-quyen.html":
                for forbidden in ("HS-SV-", "BM01B", "Lê Hoàng Minh", "PDF đã nộp", "Phân loại tài liệu"):
                    if forbidden in raw:
                        errors.append(f"{rel}: assignment identity/document leaked: {forbidden}")
            continue
        key = (rel.parts[0], rel.name)
        page = expected_pages.get(key)
        if page is None:
            errors.append(f"unexpected actor page: {rel}")
            continue
        doc = parse(path)
        codes = doc.body.get("data-page-codes", "").split()
        seen_codes.extend(codes)
        if codes != page["codes"]:
            errors.append(f"{rel}: body codes differ from schema")
        if doc.body.get("data-actor") != page["actor"] or doc.body.get("data-visibility") != page["visibility"]:
            errors.append(f"{rel}: actor/visibility metadata differs from schema")
        if doc.body.get("data-upload-mode") != page["upload"]:
            errors.append(f"{rel}: upload mode differs from schema")
        if len(doc.ids) != len(set(doc.ids)):
            errors.append(f"{rel}: duplicate id(s) {sorted(k for k,v in Counter(doc.ids).items() if v > 1)}")
        if not doc.attr_nodes("lang", "vi") or not doc.attr_nodes("id", "main") or not doc.attr_nodes("class", "skip-link"):
            errors.append(f"{rel}: missing vi language, main landmark or skip link")
        if not doc.attr_nodes("aria-label"):
            errors.append(f"{rel}: no accessible-name semantics found")
        for button in doc.buttons:
            if button.get("type") != "button":
                errors.append(f"{rel}: button without type=button")
        for input_node in doc.inputs:
            input_id = input_node.get("id")
            if input_id and not any(label.get("for") == input_id for label in doc.labels):
                errors.append(f"{rel}: input {input_id} has no explicit label")
        for target in doc.assets + doc.links:
            if target.startswith(("http:", "https:", "mailto:")):
                continue
            clean, fragment = urldefrag(target)
            target_path = (path.parent / clean).resolve() if clean else path.resolve()
            if clean and not target_path.exists():
                errors.append(f"{rel}: broken local reference {target}")
            elif fragment and fragment.startswith("action-target-") and target_path.suffix.lower() == ".html":
                target_doc = doc if target_path == path.resolve() else parse(target_path)
                if fragment not in target_doc.ids:
                    errors.append(f"{rel}: broken local anchor {target}")
        action_nodes = [attrs for _, attrs in doc.attr_nodes("data-action-id")]
        branches = {a.get("data-action-branch") for a in action_nodes}
        for code in codes:
            missing = required_branches.get(code, set()) - branches
            if missing:
                errors.append(f"{rel}: {code} missing branches {sorted(missing)}")
            required = required_fields.get(code, set())
            actual = {attrs.get("id") for _, attrs in doc.attr_nodes("data-business-field")}
            if required - actual:
                errors.append(f"{rel}: {code} missing specialized fields {sorted(required-actual)}")
        for action_node in action_nodes:
            branch = action_node.get("data-action-branch")
            requirement = action_node.get("data-require", "")
            if branch in reason_branches and "reason" not in requirement:
                errors.append(f"{rel}: branch {branch} must require a reason")
            if page["actor"] == "pk" and action_node.get("data-action-id") in irreversible_pk_actions and "reason" not in requirement:
                errors.append(f"{rel}: irreversible P.KHCN action {action_node.get('data-action-id')} must require a reason")
            target = action_node.get("data-target")
            if target not in doc.ids and target not in {"page", "topic-cancel", "pk-account-form", "ct-ballot", "tv-ballot", "tk-minutes"}:
                errors.append(f"{rel}: action target {target} does not exist")
            for file_id in re.findall(r"(?:^|,)file:([^,]+)", requirement):
                if not any(node.get("id") == file_id and node.get("type") == "file" for node in doc.inputs):
                    errors.append(f"{rel}: action requires missing file input {file_id}")
        raw = path.read_text(encoding="utf-8")
        schema_match = re.search(r'<script type="application/json" data-page-schema>(.*?)</script>', raw, re.S)
        try:
            parsed_schema = json.loads(schema_match.group(1)) if schema_match else None
        except json.JSONDecodeError as exc:
            parsed_schema = None
            errors.append(f"{rel}: invalid embedded page schema JSON: {exc}")
        if parsed_schema and parsed_schema.get("codes") != codes:
            errors.append(f"{rel}: embedded schema codes differ from body")
        file_inputs = [node for node in doc.inputs if node.get("type") == "file"]
        if page["upload"] == "none" and file_inputs:
            errors.append(f"{rel}: unauthorized upload on upload=none page")
        if page["visibility"] == "official-readonly" and file_inputs:
            errors.append(f"{rel}: upload rendered on official read-only page")
        if page["actor"] == "qt" and file_inputs:
            errors.append(f"{rel}: administrator page must not upload files")
        if page["actor"] == "pk" and any(b == "submit-ballot" for b in branches):
            errors.append(f"{rel}: P.KHCN role must not submit ballots")
        if page["actor"] == "pk":
            if raw.count('<article class="metric-card') != 4:
                errors.append(f"{rel}: P.KHCN workspace must expose exactly four scoped summary metrics")
            if raw.count('class="lifecycle-step ') < 3 or not doc.attr_nodes("class", "panel lifecycle-panel"):
                errors.append(f"{rel}: P.KHCN workspace lacks explicit lifecycle/gate sequence")
            if len(doc.attr_nodes("data-detail-kind")) < 2:
                errors.append(f"{rel}: P.KHCN workspace needs at least two evidence/context detail panels")
            if not doc.attr_nodes("class", "panel audit-panel"):
                errors.append(f"{rel}: P.KHCN workspace lacks object/version-aware audit evidence")
            if any("data-consequence" not in action_node for action_node in action_nodes):
                errors.append(f"{rel}: every P.KHCN action must state its confirmation consequence")
            if branches & {"submit-ballot", "second-signature"}:
                errors.append(f"{rel}: P.KHCN workspace leaked ballot or Chair second-signature authority")
        if "PK-01" in codes:
            if len(doc.records) != 8 or raw.count("Đi đến hành động") != 8:
                errors.append(f"{rel}: queue count, fixture rows and linked actions must all equal 8")
            for destination in ("02-quan-ly-dot.html", "03-de-tai-va-huy.html", "04-hoi-dong-readiness.html", "05-cuoc-hop-ket-qua.html", "06-tai-lieu-buoc-03-07.html"):
                if not any(link.startswith(destination) for link in doc.links):
                    errors.append(f"{rel}: queue lacks route to {destination}")
            queue_routes = [link for link in doc.links if "#action-target-" in link]
            if len(queue_routes) != 8:
                errors.append(f"{rel}: every queue CTA must target its action group anchor")
        if "PK-02" in codes:
            for token in ("Nháp", "Đã công bố", "Đã đóng", "tự đóng", "Không có bước P.KHCN tiếp nhận BM01"):
                if token not in raw:
                    errors.append(f"{rel}: round lifecycle/PRD precedence token missing: {token}")
        if "PK-07" in codes:
            for token in ("REQ-CAN-011", "Còn trước Chờ nghiệm thu", "Đã hủy", "Dữ liệu stale"):
                if token not in raw:
                    errors.append(f"{rel}: cancellation decision context missing: {token}")
        if "PK-08" in codes:
            for token in ("Official input snapshot", "BM09 V2", "NCKH-GV-2026-006", "BM10 V1", "SHA-256", "5 người đánh giá", "Thư ký ngoài mẫu số", "Khóa cấu trúc", "gate:stage-decision"):
                if token not in raw:
                    errors.append(f"{rel}: council readiness invariant missing: {token}")
        if "PK-12" in codes:
            for token in ("5/5", "1", "Thư ký ngoài mẫu số", "CP-2026-006", "BM12 đủ 2 chữ ký", "Chờ công bố", "Phiên bản mới"):
                if token not in raw:
                    errors.append(f"{rel}: meeting/checkpoint/publication invariant missing: {token}")
            lifecycle_match = re.search(r'<section class="panel lifecycle-panel".*?</section>', raw, re.S)
            lifecycle_raw = lifecycle_match.group(0) if lifecycle_match else ""
            ordered = [lifecycle_raw.find(token) for token in ("100% phiếu", "Mốc chốt", "BM12 đủ 2 chữ ký", "Kết thúc", "Công bố")]
            if any(index < 0 for index in ordered) or ordered != sorted(ordered):
                errors.append(f"{rel}: immutable meeting gates are not rendered in canonical order")
        if "PK-16" in codes:
            for token in ("BM05/BM10/BM14", "Lưu hoặc công bố", "P.KHCN không soạn/ký", "Ghi nhận đã nhận", "P.KHCN không ký", "Không áp dụng", "bm09-components-complete", "mark-bm14-na", "Đúng bản chính thức đã ký"):
                if token not in raw:
                    errors.append(f"{rel}: Step 03–07 authority/gate token missing: {token}")
        if "PK-23" in codes and branches & {"export", "download"}:
            errors.append(f"{rel}: audit export is outside MVP")
        if page["visibility"] == "published-only":
            for record in doc.records:
                if record["attrs"].get("data-state") != "published" or record["attrs"].get("data-row-scope") != "published":
                    errors.append(f"{rel}: unpublished result record leaked into published-only page")
        if page["actor"] == "tv" and not set(codes).isdisjoint({"TV-01", "TV-02", "TV-03", "TV-04", "TV-05"}):
            record_text = " ".join(" ".join(r["text"]) for r in doc.records)
            if re.search(r"\b[1-9]/[1-9]\b|checkpoint|Mốc chốt|kết luận dự kiến", record_text, re.I):
                errors.append(f"{rel}: aggregate/checkpoint metadata leaked to member before publication")
        if "TK-03" in codes:
            gates = {attrs.get("data-gate-id"): attrs.get("data-gate-ready") for _, attrs in doc.attr_nodes("data-gate-id")}
            if gates.get("tk-votes") != "false" or gates.get("tk-checkpoint") != "false" or branches & {"complete", "end", "submit-minutes"}:
                errors.append(f"{rel}: 4/5 secretary dashboard incorrectly allows checkpoint/completion")
        if "PK-13" in codes:
            end = next((a for a in action_nodes if a.get("data-action-branch") == "end"), {})
            if not {"gate:votes", "gate:minutes"}.issubset(set(end.get("data-require", "").split(","))):
                errors.append(f"{rel}: end-meeting lacks vote/minutes gates")
            if end.get("data-unlocks") != "ended":
                errors.append(f"{rel}: end-meeting does not unlock ended gate")
        if "PK-14" in codes:
            publish = next((a for a in action_nodes if a.get("data-action-branch") == "publish"), {})
            if not {"gate:ended", "gate:publish-source"}.issubset(set(publish.get("data-require", "").split(","))):
                errors.append(f"{rel}: publish lacks ended/source gates")
        if "PK-21" in codes:
            store = next((a for a in action_nodes if a.get("data-action-branch") == "store-bm14"), {})
            if not store:
                errors.append(f"{rel}: missing BM14 storage action")
        if len(doc.records) > 1 and (not doc.attr_nodes("data-search") or not doc.attr_nodes("data-filter")):
            errors.append(f"{rel}: multi-row list lacks working search/filter controls")

    expected_codes = [code for p in gen.PAGES for code in p["codes"]]
    if sorted(seen_codes) != sorted(expected_codes) or len(set(seen_codes)) != 69:
        errors.append(f"coverage mismatch: {len(set(seen_codes))}/69 unique codes")

    index = parse(MOCKUPS / "index.html")
    detailed_folders = {gen.ACTORS[p["actor"]][0] for p in gen.PAGES}
    linked_folders = {href.split("/", 1)[0] for href in index.links if "/" in href}
    if not detailed_folders.issubset(linked_folders):
        errors.append(f"index missing detailed actor links: {sorted(detailed_folders-linked_folders)}")
    atlas_text = (MOCKUPS / "role-screen-atlas.html").read_text(encoding="utf-8")
    for folder in sorted(detailed_folders):
        if f'{folder}/' not in atlas_text:
            errors.append(f"Atlas missing detailed suite link for {folder}")
    for required_asset in (MOCKUPS / "shared/actor.css", MOCKUPS / "shared/actor.js"):
        if not required_asset.exists() or not required_asset.stat().st_size:
            errors.append(f"missing shared asset {required_asset.relative_to(ROOT)}")
    actor_js = (MOCKUPS / "shared/actor.js").read_text(encoding="utf-8")
    for token in ("Escape", "focusTarget", "aria-selected", "data-gate-id", "data-file-for", "data-visible-count", "notification-popover", "event.key !== 'Tab'", "stagePairs", "councilStage", "disableControlsForAction", "cancel-meeting", "submit-minutes"):
        if token not in actor_js:
            errors.append(f"shared JS missing accessibility/gate behavior token: {token}")
    lecturer_js = (MOCKUPS / "giang-vien/lecturer.js").read_text(encoding="utf-8")
    for token in ("window.location.hash === '#nop-lai-HS-GV-2026-031'", "const createdApplicationId = 'HS-GV-2026-045'", "const applicationId = replacementSource || createdApplicationId", "const applicationVersion", "file.type && file.type !== 'application/pdf'", "file.size === 0", "file.arrayBuffer()", "crypto.subtle.digest('SHA-256', buffer)", "contentHash === v1PdfHash", "dataset.v1PdfHash", "signature !== '%PDF-'", "pdfInput.dataset.ready !== 'true'", "new URLSearchParams(window.location.search).get('round') === 'closed'", "submitApplication.disabled = roundClosed", "[data-application-form] input", "[data-action=\"download-application-pdf\"]", "Bản xem trước chỉ đọc", "setupReturnedRoundClosure", "removeAttribute('href')", "notice.dataset.roundClosedNotice", "Đợt đăng ký đã đóng; không thể nộp Hồ sơ", "event.key === 'Escape'", "sidebar.classList.contains('open')", "menu.focus()", "data-bm01-required", "Trưởng đơn vị Khoa Công nghệ", "row.dataset.memberRow", "HS-SV-2026-044", "window.NCKHUI", "Nộp/cập nhật BM01A V2 trên cùng Hồ sơ", "preview-importance", "preview-products", "preview-content", "preview-duration", "preview-budget", "preview-application-effect", "data-live-pdf=\"importance\"", "data-live-pdf=\"application-effect\"", "tram.pham@dntu.edu.vn", "Không tìm thấy Giảng viên đủ điều kiện"):
        if token not in lecturer_js:
            errors.append(f"lecturer JS missing canonical behavior token: {token}")
    for forbidden in ("HS-GV-2026-032", "#thay-the-", "Chưa chọn Trưởng đơn vị", "data-student-advisor-picker", "select-advisor", "isStudentRole", "v1FixtureFingerprint", "file.name.toLowerCase() === 'bm01a-hs-gv-2026-031-v1.pdf'"):
        if forbidden in lecturer_js:
            errors.append(f"lecturer JS contains forbidden replacement/advisor token: {forbidden}")
    preview_match = re.search(r'<h4>1\. Thông tin đề tài</h4>(.*?)<h4>2\. Nhóm nghiên cứu</h4>', lecturer_js, re.S)
    if not preview_match:
        errors.append("lecturer JS missing BM01A preview information section")
    else:
        preview_rows = preview_match.group(1)
        if preview_rows.count('<div class="pdf-sheet-row">') != 9:
            errors.append("lecturer JS BM01A preview must contain exactly 9 sibling pdf-sheet-row elements")
        valid_rows = re.findall(r'<div class="pdf-sheet-row"><span>.*?</span><span class="pdf-sheet-value" data-live-pdf="[^"]+">.*?</span></div>', preview_rows, re.S)
        if len(valid_rows) != 9:
            errors.append("lecturer JS BM01A preview contains malformed/nested pdf-sheet-row markup")
    lecturer_css = (MOCKUPS / "giang-vien/lecturer.css").read_text(encoding="utf-8")
    for token in ("overflow-x:hidden", "min-width:0", "overflow-wrap:anywhere", "max-width:520px", "height:calc(100dvh - 16px)", ".preview-dialog .dialog-body", "overflow-y:auto", ".preview-dialog .live-form-pane"):
        if token not in lecturer_css:
            errors.append(f"lecturer CSS missing mobile overflow hardening token: {token}")
    create_page = (MOCKUPS / "giang-vien/03-bm01a-ho-so.html").read_text(encoding="utf-8")
    create_topic = "Ứng dụng học máy trong phân loại tài liệu nghiên cứu"
    waiting_topic = "Mô hình gợi ý tài liệu học tập theo năng lực"
    if create_topic not in create_page or waiting_topic in create_page or "HS-GV-2026-031" in create_page or "HS-GV-2026-045" in create_page:
        errors.append("lecturer default create HTML must model the not-created topic and expose no application ID before submit")
    if not re.search(r'data-v1-pdf-hash="[0-9a-f]{64}"', create_page):
        errors.append("lecturer BM01A page must expose the server/mock V1 SHA-256 hash")
    replacement_branch = re.search(r"if \(replacementSource && document\.querySelector\('\[data-application-page\]'\)\) \{(.*?)\n    \}", lecturer_js, re.S)
    if not replacement_branch or waiting_topic not in replacement_branch.group(1) or "HS-GV-2026-031" not in replacement_branch.group(1):
        errors.append("lecturer exact resubmit branch must switch title/fields/content to HS-GV-2026-031 V2 fixture")
    list_page = (MOCKUPS / "giang-vien/01-danh-sach-de-tai.html").read_text(encoding="utf-8")
    round_page = (MOCKUPS / "giang-vien/02-dot-dang-ky.html").read_text(encoding="utf-8")
    detail_page = (MOCKUPS / "giang-vien/04-chi-tiet-de-tai.html").read_text(encoding="utf-8")
    workspace_page = (MOCKUPS / "giang-vien/06-workspace-buoc-03-07.html").read_text(encoding="utf-8")
    returned_page = (MOCKUPS / "giang-vien/03b-bm01a-truong-don-vi-tra.html").read_text(encoding="utf-8")
    lecturer_cards = re.findall(r'<article class="topic-card"[^>]*>.*?</article>', list_page, re.S)
    card_066 = next((card for card in lecturer_cards if 'NCKH-GV-2025-066' in card), '')
    card_031 = next((card for card in lecturer_cards if 'HS-GV-2026-031' in card), '')
    card_041 = next((card for card in lecturer_cards if 'NCKH-GV-2025-041' in card), '')
    if not card_066 or 'data-relation="member"' not in card_066 or 'Bạn là Thành viên tham gia' not in card_066:
        errors.append("NCKH-GV-2025-066 list role must match the member-only project fixture")
    if '<strong>2</strong><span>Bạn là Chủ nhiệm' not in list_page or '<strong>3</strong><span>Bạn là Thành viên' not in list_page:
        errors.append("lecturer owner/member stats must match the five-project fixture")
    if not card_031 or 'href="04-chi-tiet-de-tai.html"' not in card_031 or 'HS-GV-2026-031' not in detail_page or 'NCKH-GV-2025-066' in detail_page:
        errors.append("HS-GV-2026-031 must be the sole object routed to its matching detail surface")
    if not card_041 or 'href="04-chi-tiet-de-tai.html"' in card_041 or 'Chi tiết chưa có trong prototype' not in card_041:
        errors.append("NCKH-GV-2025-041 must use the neutral unavailable-detail pattern")
    if 'NCKH-GV-2025-066' not in workspace_page or 'href="06-workspace-buoc-03-07.html">Mở workspace đề tài' not in round_page:
        errors.append("closed round must resolve NCKH-GV-2025-066 to its workspace")
    if 'data-returned-application' not in returned_page or returned_page.count('data-action="resubmit-returned-bm01"') != 2:
        errors.append("returned BM01A page must expose both resubmit actions to the closed-round runtime guard")
    experience = (MOCKUPS.parent / "EXPERIENCE.md").read_text(encoding="utf-8")
    if "mockups/giang-vien/01-viec-can-lam.html" in experience or "47 trang" in experience or "53 trang" not in experience:
        errors.append("EXPERIENCE lecturer link/page count is stale")
    atlas_text = (MOCKUPS / "role-screen-atlas.html").read_text(encoding="utf-8")
    gv_atlas = atlas_text.split("gv:{", 1)[1].split("sv:{", 1)[0]
    if "'Xét hồ sơ|1'" not in gv_atlas or "| Xét hồ sơ | ✓" not in experience:
        errors.append("lecturer IA must expose assigned review as its own navigation item")
    for token in ("'Cuộc họp & kết quả'", "'Tài liệu Bước 03–07'", "'Audit'"):
        if token not in atlas_text:
            errors.append(f"P.KHCN atlas navigation missing {token}")
    deferred = (ROOT / "_bmad-output/implementation-artifacts/deferred-work.md").read_text(encoding="utf-8")
    for token in ("Đã giải quyết, không còn outstanding", "release patch round 4", "Không còn mục outstanding", "trả focus về nút mở menu"):
        if token not in deferred:
            errors.append(f"deferred-work resolution status missing token: {token}")
    link_contract = experience + (MOCKUPS.parent / "DESIGN.md").read_text(encoding="utf-8") + (MOCKUPS / "role-screen-atlas.html").read_text(encoding="utf-8") + (MOCKUPS / "index.html").read_text(encoding="utf-8")
    for legacy in gen.LECTURER_OLD_FILES:
        if f"giang-vien/{legacy}" in link_contract:
            errors.append(f"documentation links deleted lecturer page giang-vien/{legacy}")
    for actor, count in gen.TASK_COUNTS.items():
        if actor == "gv":
            continue
        actor_page = next(path for path in generated if parse(path).body.get("data-actor") == actor)
        if f'>{count}</span>' not in actor_page.read_text(encoding="utf-8"):
            errors.append(f"{actor}: missing role-specific task count {count}")

    pk_folder = MOCKUPS / "p-khcn"
    pk_council = (pk_folder / "04-hoi-dong-readiness.html").read_text(encoding="utf-8")
    pk_meeting = (pk_folder / "05-cuoc-hop-ket-qua.html").read_text(encoding="utf-8")
    pk_documents = (pk_folder / "06-tai-lieu-buoc-03-07.html").read_text(encoding="utf-8")
    pk_audit = (pk_folder / "07-audit-nghiep-vu.html").read_text(encoding="utf-8")
    if "BM09 V2 · NCKH-GV-2026-006" not in pk_council or "BM09 V2 của NCKH-SV-2025-018" not in pk_documents:
        errors.append("P.KHCN cross-workspace BM09 fixtures must identify distinct topic/version snapshots")
    checkpoint_stamp = "22/07/2026 13:42 ICT"
    if checkpoint_stamp not in pk_meeting or checkpoint_stamp not in pk_audit or "21/07/2026 16:40" in pk_audit:
        errors.append("CP-2026-006 immutable timestamp differs across meeting and audit workspaces")
    for nav_token in ("Cuộc họp &amp; kết quả", "Tài liệu Bước 03–07", "Audit"):
        if nav_token not in pk_audit:
            errors.append(f"P.KHCN navigation missing workspace item: {nav_token}")
    if 'class="nav-link active" href="07-audit-nghiep-vu.html"' not in pk_audit:
        errors.append("PK-23 must activate its own Audit navigation item")
    actor_js = (MOCKUPS / "shared/actor.js").read_text(encoding="utf-8")
    for token in ("currentMissing = missingRequirements(action)", "cancel-current-stage", "members.length !== 4", "acceptedCouncilRoster === councilRosterFingerprint()", "store-bm14' && $('#bm14-contract-applicability')", "data-audit-event", "const haystack =", "context.before", "toLocaleString('vi-VN'", "updateMetric('Yêu cầu hủy chờ xử lý'", "updateMetric('Đợt Nháp'", "Đã công bố</span></article>", "round-description", "applyPkTransition(action, reason, context)"):
        if token not in actor_js:
            errors.append(f"P.KHCN runtime transition/stale/filter guard missing token: {token}")
    errors.extend(runtime_browser_errors())

    if errors:
        print(f"FAIL: {len(errors)} lỗi")
        for error in errors:
            print(f"- {error}")
        return 1
    print("OK: 53 trang / 69 mã; lecturer clone parity, coverage, neutral security states, links, assets, scopes, publication guards, branches, gates, upload authorization, filters và semantics hợp lệ")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
