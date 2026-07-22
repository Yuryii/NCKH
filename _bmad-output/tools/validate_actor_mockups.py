#!/usr/bin/env python3
"""Structural, authorization and workflow validator for generated actor mockups."""

from __future__ import annotations

import importlib.util
import json
import re
import sys
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
    expected_pages = {(gen.ACTORS[p["actor"]][0], p["filename"]): p for p in gen.PAGES}
    generated = []
    for folder, *_ in gen.ACTORS.values():
        generated.extend((MOCKUPS / folder).glob("*.html"))
    if len(generated) != 47:
        errors.append(f"expected 47 actor HTML pages, got {len(generated)}")

    seen_codes = []
    required_branches = {
        "GV-07": {"approve", "return"}, "TD-03": {"approve", "return"}, "TD-04": {"sign-route", "return"},
        "PK-07": {"approve-cancel", "reject-cancel"}, "PK-12": {"cancel-meeting", "replace-meeting"},
        "PK-13": {"end"}, "PK-14": {"publish"}, "PK-15": {"adjust"},
        "PK-16": {"publish-bm05"}, "PK-17": {"accept-bm08"}, "PK-18": {"return-bm09", "accept-bm09"},
        "PK-19": {"publish-bm10"}, "PK-20": {"confirm-bm13", "return-bm13"}, "PK-21": {"store-bm14"},
        "PK-22": {"complete-step07"}, "CT-06": {"return", "approve"}, "CT-07": {"second-signature"},
        "CT-05": {"preview", "export", "submit-ballot"}, "TV-05": {"preview", "export", "submit-ballot"},
        "TK-05": {"preview", "export", "submit-minutes", "resubmit-minutes"}, "QT-03": {"approve", "reject"},
        "QT-05": {"lock", "unlock", "password-reset"},
    }
    required_fields = {
        "GV-04": {"topic", "field", "team-1-name", "team-1-email", "team-1-role", "team-2-name", "team-2-email", "team-2-role", "team-unit", "objective", "products"},
        "PK-02": {"round-name", "round-type", "round-direct-topics", "round-start", "round-end"},
        "PK-08": {"council-stage", "council-input", "council-chair", "council-secretary", "council-members"},
        "CT-05": {"ct-ballot-stage", "ct-ballot-kind", "ct-score", "ct-comment"}, "TV-05": {"tv-ballot-stage", "tv-ballot-kind", "tv-score", "tv-comment"},
        "TK-05": {"minutes-stage", "minutes-kind", "minutes-scenario", "meeting-date", "meeting-time", "meeting-place", "minutes-conclusion"},
        "QT-04": {"pk-name", "pk-email", "pk-code"},
    }
    reason_branches = {"reject", "return", "cancel-request", "approve-cancel", "reject-cancel", "cancel-meeting", "adjust", "return-bm09", "return-bm13", "lock"}

    for path in sorted(generated):
        rel = path.relative_to(MOCKUPS)
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
            if target.startswith(("http:", "https:", "mailto:", "#")):
                continue
            clean, _ = urldefrag(target)
            if clean and not (path.parent / clean).resolve().exists():
                errors.append(f"{rel}: broken local reference {target}")
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
    for actor, count in gen.TASK_COUNTS.items():
        actor_page = next(path for path in generated if parse(path).body.get("data-actor") == actor)
        if f'>{count}</span>' not in actor_page.read_text(encoding="utf-8"):
            errors.append(f"{actor}: missing role-specific task count {count}")

    if errors:
        print(f"FAIL: {len(errors)} lỗi")
        for error in errors:
            print(f"- {error}")
        return 1
    print("OK: 47 trang / 69 mã; coverage, links, assets, scopes, publication guards, branches, gates, upload authorization, filters và semantics hợp lệ")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
