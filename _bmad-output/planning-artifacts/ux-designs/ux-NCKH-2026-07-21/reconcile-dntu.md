# Đối chiếu tham chiếu thị giác DNTU

Nguồn đối chiếu: `imports/dntu-visual-reference.md` với `DESIGN.md` và `EXPERIENCE.md`. Tham chiếu DNTU chỉ định hướng nhận diện; không tạo yêu cầu chức năng.

## Được giữ

- Tinh thần đỏ–trắng, tương phản cao, sắc thái trang trọng và góc tương đối sắc.
- Token trực tiếp: đỏ chính `#AB1F24`, trắng `#FFFFFF`, nền sáng `#F6F6F6`, tiêu đề `#262626`, viền `#D9D9D9` và bán kính cơ sở `3px`.
- Montserrat là kiểu chữ giao diện, có Arial/sans-serif dự phòng.

## Được chuyển hóa

- Đỏ chỉ dùng cho nhận diện, điều hướng đang chọn, mốc hiện tại và hành động chính; vùng tác nghiệp chủ yếu là trắng/xám để quét bảng, biểu mẫu, timeline và bằng chứng nhanh.
- Đỏ hover được chuẩn hóa thành deep red `#911C24`; màu quan sát `#AF0E2E` không trở thành token riêng để tránh hai trạng thái đỏ gần nhau.
- Màu body `#737477` được thay bằng `#4E5054` và muted `#66686B` để đáp ứng mục tiêu tương phản WCAG 2.2 AA; focus dùng xanh `#2457C5` để tách khỏi màu thương hiệu.
- Tính “tương phản cao” được cụ thể hóa thành ngưỡng tương phản, viền control rõ, focus ring, nhãn/icon đi cùng màu và không dùng màu làm tín hiệu duy nhất.
- Tinh thần góc sắc được mở rộng thành thang radius `3/6/8px`; pill chỉ dành cho status badge nhỏ.
- Mật độ thông tin và khả năng quét nhanh được cụ thể hóa qua task-first app shell, bảng, checklist, timeline, action bar và evidence/version panels.

## Được loại bỏ có chủ đích

- Canela Trial không dùng vì không phù hợp bề mặt nghiệp vụ nhiều dữ liệu.
- Footer `#181818` không được mang sang vì ứng dụng không dùng footer marketing dài.
- Hero, carousel tin tức, ảnh nền, mega menu, banner/dải đỏ lớn và bố cục tin tức DNTU không được sao chép.

## Kiểm tra ý định định tính

Không phát hiện chi tiết định tính nào bị rơi: đỏ–trắng, tương phản cao, góc sắc, không sao chép website marketing, ưu tiên mật độ thông tin, trạng thái quy trình và khả năng quét nhanh đều đã có hợp đồng tương ứng trong hai spine. Các token không được giữ nguyên đều có lý do về khả dụng hoặc tính phù hợp tác nghiệp.

## Quy tắc xung đột

Xác nhận **spines thắng khi có xung đột**: `DESIGN.md` và `EXPERIENCE.md` là nguồn chuẩn; `imports/dntu-visual-reference.md` và mọi mockup chỉ là nguồn tham khảo/phép chiếu và phải được điều chỉnh theo hai spine.
