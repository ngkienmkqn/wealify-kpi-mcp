```yaml
type: "chapter_marketing"
quarter: "Q2/2026"
chapter: "Marketing"
chapter_lead: "@huyldd"
metric_tool: "Metabase + CRM Dashboard"
status: "Draft"
```

## 🚨 NGUYÊN TẮC PHÁN XỬ

1. Tài liệu này là **cơ sở duy nhất** để tính Hệ số chuyên môn cá nhân (Engine 2) khi kết thúc Quý.
2. Các chỉ số được lấy **tự động từ Metabase + CRM Dashboard**. Mọi kết quả tự báo cáo (self-report) bằng miệng / file cá nhân ngoài lại đều **vô hiệu**.
3. Document này sẽ được **Khóa (Read only)** vào ngày 1 của Quý. Mọi sự thay đổi ngưỡng giữa chừng phải có Approve từ CEO và thông báo công khai cho toàn Chapter trên Lark.

---

## PHẦN A: RUBRIC CHO MARKETING

### A.1 — Chỉ số cốt lõi: Tăng Trưởng Khách Hàng MỚI Sử Dụng Dịch Vụ

**North Star Metric:** Tỷ lệ tăng trưởng **khách hàng MỚI** phát sinh ≥1 giao dịch hoặc sử dụng dịch vụ (VA + VC + THE) trung bình mỗi tháng — Target **15%/tháng**.

> Khách hàng MỚI = khách hàng lần đầu phát sinh giao dịch/sử dụng dịch vụ trong tháng đó (first-time transacting customer). Không tính khách hàng cũ quay lại.

**Nguồn dữ liệu:** Metabase → New Transacting Customers Report, filter theo `first_transaction_date` trong tháng + loại sản phẩm (VA/VC/THE).

**Dashboard URL:** [Dán link Metabase Dashboard tại đây]

| Mức độ / Hệ số | Cột 1: Năng lực chuyên môn (Định tính) | Cột 2: Data đo lường tự động (Metabase) | Cột 3: Ngưỡng điều kiện (Threshold) |
|:---|:---|:---|:---|
| **❌ KHÔNG ĐẠT (0x)** — Vi phạm tiêu chuẩn hoặc dưới đáy KPI | Không triển khai campaign đúng hạn, thiếu nurture flow cho user đã đăng ký, bỏ lỡ conversion opportunities rõ ràng. Không phối hợp với Product/Sales. | 1. Tăng trưởng KH MỚI sử dụng dịch vụ (VA+VC+THE) < 8%/tháng trung bình. 2. Có ≥1 tháng tăng trưởng âm (giảm KH MỚI so với tháng trước). | Trung bình **< 8%/tháng** **HOẶC** có tháng tăng trưởng âm |
| **✅ ĐẠT CHUẨN (1.0x)** — Đáp ứng đúng kỳ vọng | Campaign đúng timeline, content đa kênh có CTA rõ ràng. Nurture flow vận hành ổn định. Phối hợp tốt với Product/Sales để convert lead → sử dụng dịch vụ. | 1. Tăng trưởng KH MỚI sử dụng dịch vụ (VA+VC+THE) 8–15%/tháng trung bình. 2. Conversion rate (đăng ký → sử dụng dịch vụ lần đầu) ổn định hoặc tăng so với Q1. | **8% ≤** Trung bình **≤ 15%/tháng** |
| **🌟 XUẤT SẮC (1.15x)** — Vượt trội, dẫn dắt | Chủ động mở kênh acquisition mới, tối ưu conversion rate vượt kỳ vọng, đề xuất sáng kiến tăng retention/reactivation. Chủ động unblock cho team khác. | 1. Tăng trưởng KH MỚI > 15%/tháng trung bình. 2. Có kênh/campaign mới đóng góp measurable vào tổng KH MỚI sử dụng dịch vụ. | Trung bình **> 15%/tháng VÀ** Được Lead xác nhận hỗ trợ unblock cho ≥ 1 đồng đội |
