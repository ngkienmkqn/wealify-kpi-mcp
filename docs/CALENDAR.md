# LỊCH SỰ KIỆN & DEADLINE — KPI Dashboard Q2/2026

> AI Agent đọc file này + kết hợp ngày hiện tại để trả lời "hôm nay có gì?", "tuần này cần chú ý gì?"

---

## LỊCH CỐ ĐỊNH HÀNG THÁNG (lặp lại mỗi tháng)

| Ngày | Giờ (ICT) | Sự kiện | Ai liên quan | Hành động Agent |
|------|-----------|---------|-------------|-----------------|
| **Ngày 1** | 00:00 | Mở kỳ scoring tháng mới | HR, System | Gọi `kpi_scoring_period` kiểm tra state = OPEN |
| **Ngày 1–3** | — | CRM Sync chạy cập nhật dữ liệu | System | Gọi `kpi_health` kiểm tra sync status |
| **Ngày 4** | **12:00** | ⏰ Hạn chót 1: Lead nhận & rà soát form tự đánh giá KNL | Chapter Leads | Gọi `kpi_sla_status` nhắc Lead chưa hoàn thành |
| **Ngày 4** | **17:00** | 🚨 Hạn chót 2: DEADLINE chốt điểm KNL + duyệt hệ số Rubric | Chapter Leads | Gọi `kpi_sla_status` → ai `isOverdue=true` → hệ số tự động 0x |
| **Ngày 5–7** | — | HR review & lock scoring period | HR, CEO | Gọi `kpi_scoring_period` kiểm tra state = LOCKED |
| **Ngày 10** | — | Lương được xử lý | Finance | — |
| **Ngày 15** | — | Mid-month check: review pacing | CEO, Leads | Gọi `kpi_chapter` + `kpi_alerts` |

---

## LỊCH Q2/2026 CỤ THỂ

### Tháng 4/2026 (đã qua)
- ✅ 01/04: Mở scoring tháng 03
- ✅ 04/04: Hạn chót chấm điểm tháng 03 — Tất cả Lead đã chốt
- ✅ 01/04: Rubric Q2/2026 được publish & khóa Read-only

### Tháng 5/2026 (đã qua)
- ✅ 01/05: Mở scoring tháng 04
- ✅ 04/05: Hạn chót chấm điểm tháng 04

### Tháng 6/2026 (ĐANG DIỄN RA)
- ✅ 01/06: Mở scoring tháng 05
- **⏰ 04/06 12:00**: Hạn chót 1 — Lead nhận form tự đánh giá KNL
- **🚨 04/06 17:00**: Hạn chót 2 — DEADLINE chốt điểm + duyệt hệ số Rubric
- 📋 05–07/06: HR review, lock scoring
- 📋 30/06: Kết thúc Q2/2026

### Tháng 7/2026 (sắp tới)
- 📋 01/07: Mở scoring tháng 06 + tổng kết Q2
- 📋 04/07: Hạn chót chấm điểm tháng 06
- 📋 01/07: Publish Rubric Q3/2026

---

## CÁC SỰ KIỆN ĐẶC BIỆT CẦN CHÚ Ý

### Hiệu lực từ Q2/2026
1. **Vi phạm thời hạn = 0x**: Lead không chốt điểm trước 17:00 ngày 4 → hệ số KPI tháng đó tự động 0x
2. **3 trụ cột Rubric mới**: Squad KPIs (50%) + Chapter KPIs (30%) + AI & Automation (20%)
3. **Thang 4 bậc**: Điểm 1=0x / Điểm 2=0.5-0.7x / Điểm 3=1.0x / Điểm 4=1.15-1.5x
4. **Rule data thiếu**: Team thiếu dữ liệu từ Lead → có thể delay lương cả team

---

## CÁCH AGENT TRẢ LỜI CÂU HỎI THEO THỜI GIAN

### "Hôm nay có gì cần chú ý?"
1. Đọc file này → tìm ngày hiện tại trong lịch
2. Gọi `kpi_sla_status(month tương ứng)` → check deadline
3. Gọi `kpi_alerts()` → check cảnh báo
4. Trả lời: liệt kê deadline + cảnh báo + action cần làm

### "Tuần này có gì quan trọng?"
1. Đọc file này → tìm các sự kiện trong 7 ngày tới
2. Gọi `kpi_scoring_period` → check trạng thái scoring
3. Trả lời: timeline tuần + ai cần làm gì

### "Thời gian qua có gì đáng chú ý?"
1. Gọi `kpi_chapter(chapter)` → xem metrics có bất thường không
2. Gọi `kpi_alerts()` → check warnings
3. So sánh Q1 vs Q2: `kpi_chapter(quarter='Q1/2026')` vs `kpi_chapter(quarter='Q2/2026')`
4. Trả lời: highlight metric thay đổi lớn + trends

### "Ngày mai/tuần sau cần chuẩn bị gì?"
1. Đọc file này → tìm sự kiện upcoming
2. Gọi `kpi_scoring_coverage` → check ai thiếu data
3. Trả lời: to-do list cho người hỏi
