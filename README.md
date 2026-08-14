# Nguyễn Văn An — CV + Evidence Portfolio

Một static portfolio không cần build framework:

- Trang chính là CV cô đọng, có keyword cho ATS và nút in/PDF.
- Ba case study riêng nối từng claim với source, test và giới hạn.
- Vietnamese/English toggle, dark/light mode, responsive và print A4.
- GitHub Actions kiểm tra link, tạo PDF, đóng gói release và deploy Pages.

## Chạy local

```powershell
python -m http.server 4173 --directory portfolio
```

Mở `http://localhost:4173`. Chạy kiểm tra:

```powershell
python -m unittest discover -s portfolio/tests -v
```

## Chỉnh nội dung

- `index.html`: CV, skills, project highlights, email.
- `evidence/*.html`: case study chi tiết.
- `app.js`: bản dịch English.
- `styles.css`: design system và layout in A4.

Nút **Tải CV** mở print dialog của trình duyệt. Chọn **Save as PDF**. Trên CI, file `nguyen-van-an-cv.pdf` được sinh tự động từ chế độ `?print=1`.

## Deploy và release

Workflow `.github/workflows/portfolio-pages.yml` chạy khi push `main` hoặc tag `portfolio-v*`:

- `main`: deploy thư mục `portfolio/` lên GitHub Pages.
- `portfolio-v*`: tạo GitHub Release chứa PDF và ZIP source tĩnh.

Trước lần deploy đầu, vào **Settings → Pages → Source → GitHub Actions**.

## Nội dung cần xác nhận trước khi public

- Mốc bắt đầu học `2022` (website đang để `2022–present`, không đoán năm tốt nghiệp).
- Email public `annguyen11012k4@gmail.com`.
- Job title mục tiêu và trạng thái đang tìm việc.
- Domain/canonical URL nếu có.
