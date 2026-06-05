```yaml
type: "chapter_marketing"
quarter: "Q2/2026"
chapter: "Marketing"
chapter_lead: "@huyldd"
metric_tool: "AWS Ledger + CRM Database"
status: "Active"
```

## 🚨 NGUYÊN TẮC PHÁN XỬ

1. Tài liệu này là **cơ sở duy nhất** để tính Hệ số chuyên môn cá nhân (Engine 2) khi kết thúc Quý.
2. Các chỉ số được lấy **tự động từ AWS Ledger (bảng transactions) + CRM Database**. Mọi kết quả tự báo cáo (self-report) bằng miệng / file cá nhân ngoài lại đều **vô hiệu**.
3. Document này sẽ được **Khóa (Read only)** vào ngày 1 của Quý. Mọi sự thay đổi ngưỡng giữa chừng phải có Approve từ CEO và thông báo công khai cho toàn Chapter trên Lark.

---

## PHẦN A: RUBRIC CHO MARKETING

### A.1 — Chỉ số cốt lõi: Tăng Trưởng Khách Hàng MỚI có Giao Dịch TOP_UP Lần Đầu

**North Star Metric:** Tỷ lệ tăng trưởng **khách hàng MỚI** có giao dịch TOP_UP lần đầu tiên được APPROVED, trung bình mỗi tháng — Target **15%/tháng**.

> **Định nghĩa KH MỚI (First Top-up User - FTD):**
> - Khách hàng có `status = 1` (Active) trong bảng `customers`
> - Giao dịch loại `transaction_type = 'TOP_UP'` trong bảng `transactions`
> - Trạng thái giao dịch `transaction_status = 'APPROVED'` trong bảng `transaction-histories`
> - Lần giao dịch ĐẦU TIÊN (`MIN(approved_at)`) rơi vào tháng đang tính
> - Không tính khách hàng cũ đã từng giao dịch trước đó
> - **Đặc biệt (Khác với Sales):** KHÔNG áp dụng mức nạp tối thiểu 100k. Chỉ cần có giao dịch thành công (kể cả số tiền nhỏ) là đã được tính là một Khách Mới do Marketing mang về.

**Nguồn dữ liệu:** AWS Ledger → bảng `transactions` JOIN `transaction-histories` JOIN `customers`. Chỉ lấy giao dịch TOP_UP + APPROVED + Customer Active.

**Lưu ý:** Tháng đang diễn ra (chưa kết thúc) sẽ **không được tính** vào trung bình MoM để tránh sai lệch dữ liệu.

**Dashboard URL:** https://admin.wealify.com/ceo-dashboard (Chapter Marketing)

| Mức độ / Hệ số | Cột 1: Năng lực chuyên môn (Định tính) | Cột 2: Data đo lường tự động (AWS Ledger) | Cột 3: Ngưỡng điều kiện (Threshold) |
|:---|:---|:---|:---|
| **❌ KHÔNG ĐẠT (0x)** — Vi phạm tiêu chuẩn hoặc dưới đáy KPI | Không triển khai campaign đúng hạn, thiếu nurture flow cho user đã đăng ký, bỏ lỡ conversion opportunities rõ ràng. Không phối hợp với Product/Sales. | 1. Tăng trưởng KH MỚI có TOP_UP lần đầu < 8%/tháng trung bình. 2. Có ≥1 tháng tăng trưởng âm (giảm KH MỚI so với tháng trước). | Trung bình **< 8%/tháng** **HOẶC** có tháng tăng trưởng âm |
| **✅ ĐẠT CHUẨN (1.0x)** — Đáp ứng đúng kỳ vọng | Campaign đúng timeline, content đa kênh có CTA rõ ràng. Nurture flow vận hành ổn định. Phối hợp tốt với Product/Sales để convert lead → giao dịch TOP_UP đầu tiên. | 1. Tăng trưởng KH MỚI có TOP_UP lần đầu 8–15%/tháng trung bình. 2. Conversion rate (đăng ký → TOP_UP lần đầu) ổn định hoặc tăng so với Q1. | **8% ≤** Trung bình **≤ 15%/tháng** |
| **🌟 XUẤT SẮC (1.15x)** — Vượt trội, dẫn dắt | Chủ động mở kênh acquisition mới, tối ưu conversion rate vượt kỳ vọng, đề xuất sáng kiến tăng retention/reactivation. Chủ động unblock cho team khác. | 1. Tăng trưởng KH MỚI có TOP_UP > 15%/tháng trung bình. 2. Có kênh/campaign mới đóng góp measurable vào tổng KH MỚI giao dịch lần đầu. | Trung bình **> 15%/tháng VÀ** Được Lead xác nhận hỗ trợ unblock cho ≥ 1 đồng đội |
