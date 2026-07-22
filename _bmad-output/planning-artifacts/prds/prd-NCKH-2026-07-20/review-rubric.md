# PRD Quality Review — Hệ thống quản lý hoạt động nghiên cứu khoa học cấp trường

> **Lưu ý 2026-07-21:** Báo cáo này đánh giá baseline cũ giới hạn Bước 01–02 và được giữ để truy vết. Review hiện hành cho phạm vi Bước 01–07 nằm tại `review-rubric-b01-b07.md`.

## Overall verdict

PRD có thesis vận hành rõ, ranh giới MVP trung thực và các quyết định khó về Tài khoản, Cuộc họp, điều kiện 100% phiếu, khóa Hội đồng và công bố kết quả đã được chốt nhất quán. Tài liệu đủ mạnh để tiếp tục hoàn thiện, nhưng chưa nên chuyển thẳng sang Story vì một nhóm FR ngắn chưa nêu hậu quả kiểm thử và các Open Questions trước pilot chưa có owner/điều kiện xem lại.

## Decision-readiness — adequate

Các quyết định chính được phát biểu trực tiếp trong §4, §6 và §8; §11.1 xác nhận không còn blocker. Những mục còn mở ở §11.2 là hợp lý đối với giai đoạn trước pilot nhưng chưa chỉ rõ ai chịu trách nhiệm và mốc phải chốt.

### Findings

- **medium** Open Questions chưa có owner và revisit condition (§11.2) — Các mục về miền email, lời mời, file, tải, NFR và pilot có thể bị bỏ quên khi chuyển pha. *Fix:* gán owner dự kiến và mốc chốt cho từng nhóm.

## Substance over theater — adequate

Hành trình người dùng đều ép ra quyết định nghiệp vụ; các NFR phần lớn có mục tiêu hoặc gắn assumption. Một số ngưỡng hiệu năng, RPO/RTO và KPI vẫn là baseline suy luận nhưng được đánh dấu đúng, không giả làm quyết định đã xác nhận.

### Findings

- **medium** NFR/KPI chưa có phương pháp đo (§5.3, §5.5, §9) — Các con số 3 giây, 10 giây, 90%, 85%, 50% và 95% chưa chỉ rõ nguồn dữ liệu đo. *Fix:* bổ sung measurement note hoặc để owner vận hành chốt trước pilot.

## Strategic coherence — adequate

MVP Bước 01–02 bám đúng vấn đề vận hành: một nguồn trạng thái, bằng chứng có phiên bản, quyền theo ngữ cảnh và điều kiện hoàn tất Hội đồng. Success Metrics và counter-metrics ngăn việc tối ưu bằng cách bỏ qua kiểm soát.

### Findings

- **low** Bản đồ Trạng thái tổng quan bao phủ cả giai đoạn ngoài MVP (§3.1) — Có giá trị cho tầm nhìn dài hạn nhưng có thể khiến người đọc hiểu toàn bộ vòng đời là phạm vi triển khai hiện tại. *Fix:* thêm nhãn rõ trạng thái sau “Đạt xét duyệt hồ sơ” thuộc định hướng hậu MVP.

## Done-ness clarity — thin

Các luồng phức tạp như đăng ký, mở/đóng Cuộc họp, đủ 100% phiếu, hủy–thay thế và công bố có tiêu chí kiểm thử tốt. Tuy nhiên một số FR ngắn chỉ nêu khả năng mà chưa chỉ ra điều kiện hoàn tất, khiến Story generation phải tự suy luận.

### Findings

- **high** Một số FR thiếu điều kiện kiểm thử (§4: FR-7, FR-13, FR-14, FR-15, FR-22, FR-28, FR-31, FR-33, FR-34, FR-35) — Các yêu cầu này chưa nói rõ quyền, trạng thái chuyển hoặc bằng chứng cần quan sát. *Fix:* bổ sung 1–3 điều kiện kiểm thử cụ thể cho từng FR.

## Scope honesty — strong

MVP, phần ngoài phạm vi, mục tiêu ngoài sản phẩm và assumption index đều hiện diện. Các quyết định bị hoãn không bị che giấu; §11.1 không còn blocker và §11.2 giữ các việc cần chốt trước pilot.

## Downstream usability — adequate

FR/UJ/NFR có ID duy nhất, Glossary khá đầy đủ, hành trình có nhân vật và phần nguồn đầu vào nêu thứ tự ưu tiên. Hai danh từ miền được sử dụng nhiều nhưng chưa có định nghĩa độc lập.

### Findings

- **medium** Thiếu định nghĩa “Đề tài NCKH” và “Hồ sơ cá nhân” (§3) — Hai thuật ngữ xuất hiện trong FR trạng thái và tài khoản nhưng chưa có nghĩa/cardi­nality rõ. *Fix:* bổ sung vào Glossary.
- **low** ID FR không theo thứ tự trình bày và thiếu FR-30 (§4) — Đây là hệ quả của giữ ID ổn định sau thay đổi, nhưng downstream reader có thể tưởng thiếu nội dung. *Fix:* ghi chú FR-30 đã retired và ID mới được append để bảo toàn tham chiếu.

## Shape fit — strong

Đây là hệ thống nội bộ nhiều stakeholder và nhiều lần chuyển trách nhiệm; shape capability-first kết hợp hành trình có tên là phù hợp. Mức chi tiết cao ở Hội đồng/biểu mẫu là cần thiết vì PRD sẽ cấp nguồn cho UX, kiến trúc và Story.

## Mechanical notes

- Không phát hiện ID trùng.
- UJ-1 đến UJ-6 đều có nhân vật có tên.
- Assumption Index cần được kiểm tra roundtrip lại sau các lượt sửa.
- Frontmatter vẫn đúng ở trạng thái `draft`.

## Trạng thái xử lý — 2026-07-20

- Đã bổ sung chủ sở hữu và cổng chốt cho toàn bộ câu hỏi không chặn tại §11.2.
- Đã bổ sung nguồn đo, thời điểm đo và trách nhiệm đo cho NFR hiệu năng, sao lưu và các chỉ số pilot.
- Đã làm rõ các trạng thái sau `Đạt xét duyệt hồ sơ` là định hướng hậu MVP.
- Đã bổ sung điều kiện kiểm thử cho FR-7, FR-13, FR-14, FR-15, FR-22, FR-28, FR-31, FR-33, FR-34 và FR-35.
- Đã bổ sung định nghĩa `Đề tài NCKH`, `Hồ sơ cá nhân` và ghi rõ FR-30 đã ngừng sử dụng.
- Đã kiểm tra roundtrip Chỉ mục giả định: mọi giả định nội tuyến đều có mục đối chiếu; các giả định SM được nhóm tại mục §9.

Sau xử lý, không còn finding mức high hoặc medium chưa giải quyết. Tài liệu đủ điều kiện chuyển sang vòng hoàn tất PRD; các mục OQ-4 đến OQ-10 vẫn là cổng trước pilot, không phải blocker của baseline MVP.
