---
type: "chapter_rubric"
quarter: "Q2/2026"
squad: "[Squad tương ứng - VD: VA, VC, Wallet]"
chapter: "Product"
chapter_lead: "Trang (PM)"
metric_tool: "Linear"
status: "Draft"
---

# RUBRIC CHUYÊN MÔN — CHAPTER PRODUCT — Q2/2026

> 📌 Mọi chỉ số lấy tự động từ Linear. Self-report vô hiệu. Khóa Read-only ngày 1/4.

**North Star Metric:** % Tickets bị Dev/AI trả lại yêu cầu bổ sung Spec (Spec Rejection Rate)
**Nguồn dữ liệu:** Linear — đếm số lần ticket chuyển từ "In Progress" → "Clarification Needed" → quay lại
**Dashboard URL:** [Product Lead điền link Linear dashboard vào đây]

---

## BẢNG RUBRIC

| Mức / Hệ số | Cột 1: Hành vi (Định tính) | Cột 2: Data tự động (Linear) | Cột 3: Ngưỡng |
|:---|:---|:---|:---|
| **❌ KHÔNG ĐẠT (0x)** | Spec mơ hồ, không có AC rõ ràng, để Dev/AI hỏi lại nhiều lần, có tính năng ship gây rollback vì thiếu yêu cầu | Spec Rejection Rate cao **HOẶC** có feature phải rollback do thiếu spec | `> 40%` tickets bị trả lại **HOẶC** có rollback do Spec sai |
| **✅ ĐẠT CHUẨN (1.0x)** | Spec đủ dùng, AC Gherkin rõ ràng, Dev/AI hiểu được và chạy | Số lần trả lại ở mức trung bình | `20–40%` tickets bị trả lại |
| **🌟 XUẤT SẮC (1.15x)** | Spec cực nét, AI nhận là code được luôn, chủ động PRD sớm trước cycle | Rejection Rate thấp nhất team | `< 20%` tickets bị trả lại **VÀ** Lead xác nhận Spec chất lượng cao |
