## Document Summary

- **Purpose:** Giúp kiến trúc sư, designer và story/dev agent triển khai NCKH mà không suy diễn nhận diện, hành vi, trạng thái, quyền hoặc bằng chứng.
- **Audience:** Downstream human và AI consumers.
- **Reader type:** LLM — ưu tiên precision, dependency-first và thuật ngữ nhất quán.
- **Structure model:** Reference/Database; Key Flows dùng mô hình Tutorial/Guide cục bộ.
- **Current length:** `DESIGN.md` 2.247 từ/8 section; `EXPERIENCE.md` 5.909 từ/12 section.

## Recommendations

### 1. PRESERVE — Thứ tự canonical của DESIGN.md

**Rationale:** Tám section đúng Google `design.md` contract và hỗ trợ truy xuất ngẫu nhiên.
**Impact:** 0 từ.

### 2. PRESERVE — Các bảng IA, component, state và workflow integrity

**Rationale:** Bảng giữ schema nhất quán, MECE và giảm suy diễn cho downstream consumer.
**Impact:** 0 từ.

### 3. CONDENSE — Quy tắc Evidence/PDF lặp trong flow

**Rationale:** `Evidence & PDF Contract` phải là nguồn chuẩn; flow chỉ cần nêu delta/climax/failure liên quan.
**Impact:** khoảng 80–140 từ khi polish, không cắt điều kiện nghiệp vụ.

### 4. PRESERVE — Key Flows và hai flow nghiệp vụ bổ sung

**Rationale:** Named protagonist, climax và failure path là bằng chứng surface closure, không phải narrative trang trí.
**Impact:** 0 từ.

### 5. PRESERVE — Workflow Integrity & Authorization trước Key Flows

**Rationale:** Định nghĩa invariant trước khi flow sử dụng chúng, phù hợp dependency-first.
**Impact:** 0 từ.

### 6. CONDENSE — Các câu nhắc lại “server kiểm tra quyền/stale”

**Rationale:** Giữ contract toàn cục ở Foundation/State Patterns; các component chỉ nêu delta cụ thể.
**Impact:** khoảng 40–80 từ khi polish.

## Summary

- **Total recommendations:** 6
- **Estimated reduction:** 120–220 từ (khoảng 1,5–2,7%)
- **Meets length target:** Không có target.
- **Comprehension trade-offs:** Không cắt bảng, journey hoặc invariant. Cấu trúc tổng thể sound; chỉ nên giảm lặp ở prose khi copy-edit.
