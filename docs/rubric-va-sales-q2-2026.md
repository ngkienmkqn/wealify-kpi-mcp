---
type: "chapter_va_sales"
quarter: "Q2/2026"
squad: "VA"
chapter: "Sales"
chapter_lead: "@Minh Sơn"
metric_tool: "CRM DO Database & Pipedrive"
engine: "1"
status: "Draft"
---

# RUBRIC KPI DOANH SỐ CHAPTER: SALES VA - Q2/2026 (ENGINE 1)

📌 NGUYÊN TẮC PHÂN XỬ:
1. Tài liệu này là cơ sở duy nhất để tính **Hệ số Doanh số cá nhân (Engine 1)** khi kết thúc Quý.
2. Toàn bộ số liệu được kéo tự động từ Database CRM (DO + AWS). Không chấp nhận self-report.
3. Document này sẽ được Khóa (Read-only) vào ngày 1 của Quý. Mọi thay đổi ngưỡng giữa chừng phải có Approve từ CEO.

1. Chỉ số cốt lõi (North Star Metric): Tổng GTV (Gross Transaction Volume) cá nhân phụ trách trong Quý.
2. Nguồn dữ liệu Tracking (Tool): `monitoring_transactions_summary` (volume_last_30d, volume_prev_30d, volume_change_rate) trên CRM Database.
3. Dashboard URL (Nếu có): https://admin.wealify.com/ceo-dashboard/va-sales-q2

---

# BẢNG TIÊU CHUẨN ĐÁNH GIÁ KPI DOANH SỐ (ENGINE 1)

### KPI 1: TỔNG DOANH SỐ GTV CÁ NHÂN TRONG QUÝ
> **Đo lường:** Tổng Volume giao dịch (VND) của toàn bộ tệp khách hàng mà Sales được assign, tính trên 3 tháng trong Quý.

| Mức độ / Hệ số | Chỉ tiêu KPI | Data từ hệ thống | Ngưỡng điều kiện |
| --- | --- | --- | --- |
| ❌ KHÔNG ĐẠT (0x) | Tổng GTV cá nhân dưới mức sàn tối thiểu. | SUM tất cả các KH được assign. | `Tổng GTV Quý < 60,000,000,000 VNĐ` |
| ✅ ĐẠT CHUẨN (1.0x) | Đạt chỉ tiêu doanh số GTV cơ bản được giao đầu Quý. | SUM tất cả các KH được assign. | `60,000,000,000 Tỷ <= Tổng GTV Quý <= 100,000,000,000 Tỷ VND` |
| 🌟 XUẤT SẮC (1.15x) | Vượt trần doanh số, nằm trong Top đầu Chapter. | SUM tất cả các KH được assign. | `Tổng GTV Quý > 100,000,000,000 VND` |


