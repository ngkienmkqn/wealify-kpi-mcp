# KPI & Bonus "Dual-Engine" Q2/2026 — Engineering Chapter

---

```yaml
type: "chapter_engineering"
quarter: "Q2/2026"
chapter: "Engineering (Dev & QA/Tester)"
chapter_lead: "@longvh"
metric_tool: "Linear"
status: "Active"
last_updated: "2026-06-08"
```

> ⚠️ **Tài liệu này đã được đồng bộ với cấu hình DB thực tế (Q2/2026).**
> Mọi ngưỡng dưới đây là giá trị đang chạy trên hệ thống — không phải draft.

---

## 📌 NGUYÊN TẮC PHÂN XỬ

1. Tài liệu này là **cơ sở duy nhất** để tính Hệ số chuyên môn cá nhân (Engine 2) khi kết thúc Quý.
2. Các chỉ số được lấy **tự động từ Linear**. Mọi kết quả tự báo cáo (self-report) bằng miệng / file cá nhân ngoại lai đều **vô hiệu**.
3. Document này sẽ được **Khóa (Read-only)** vào ngày 1 của Quý. Mọi sự thay đổi ngưỡng giữa chừng phải có Approve từ CEO và thông báo công khai cho toàn Chapter trên Lark.

---

# PHẦN A: RUBRIC CHO DEVELOPER

> **Nguồn dữ liệu:** Linear → Workspace Insights, filter theo Assignee + Quarter
> **Dashboard URL:** `kpi.wealify.com` → Chapter Engineer → Tab "Developer (Dev)"

## Chỉ số cốt lõi (tính vào hệ số nhân cuối)

| Chỉ số | Không đạt (0x) | Đạt chuẩn (1.0x) | Xuất sắc (1.15x) |
|--------|---------------|------------------|-----------------|
| **Cycle Time TB** | > 10 ngày | 5–10 ngày | < 5 ngày |
| **Critical Bugs on Prod** | ≥ 2 bugs | ≤ 1 bug | 0 bugs |
| **Tỷ lệ Hoàn thành** | < 80% | 80–95% | ≥ 95% |
| **Issue Carry-over** | ≥ 3 issues | 1–2 issues | 0 issues |

> 💡 **Cách tính hệ số cuối:** Tích 4 chỉ số cốt lõi trên × nhau.
> Ví dụ: Cycle Time `1.0x` × Critical Bugs `1.15x` × Completion `1.0x` × Carry-over `1.15x` = **1.32x**

## Chỉ số bonus (chỉ hiển thị gauge, KHÔNG tính vào hệ số cuối)

| Chỉ số | Không đạt | Đạt chuẩn | Xuất sắc | Ghi chú |
|--------|-----------|-----------|----------|---------|
| **Review PRs** | 0 PRs | 1–2 PRs | ≥ 3 PRs | Khuyến khích culture review |
| **Đóng góp (Contribution)** | 0 | 1 | ≥ 2 | Shared component, tech doc, mentor |

> ⚠️ **Tại sao không tính vào hệ số cuối?**
> REVIEW_PRS và CONTRIBUTION có `multiplierFail = 0x`. Nếu tính vào tích chung, một developer chưa review PR nào sẽ bị **toàn bộ thưởng归零 (0x)** — không phản ánh đúng năng lực cốt lõi. Hai chỉ số này được giữ trên gauge để **khuyến khích văn hóa đóng góp**, nhưng không phạt tài chính nếu chưa đạt.

## Bảng đánh giá toàn diện (định tính)

| Mức / Hệ số | Hành vi chuyên môn | Ngưỡng tổng hợp |
|---|---|---|
| **❌ KHÔNG ĐẠT (0x)** | Thiếu khả năng tự quản lý tiến độ. Thường xuyên block mà không escalate. Gây ra bug nghiêm trọng trên production. Không hoàn thành công việc được giao. Nhiều task bị cancel hoặc rollback. | Cycle Time > 10 ngày **HOẶC** Critical bugs ≥ 2 **HOẶC** Completion Rate < 80% **HOẶC** Carry-over ≥ 3 issues |
| **✅ ĐẠT CHUẨN (1.0x)** | Tự quản lý tiến độ tốt. Biết chia nhỏ task, estimate hợp lý. Escalate kịp thời khi bị block. Hiếm khi gây bug trên production. Tuân thủ coding standards. Hoàn thành đầy đủ công việc được giao. | 5 ngày ≤ Cycle Time ≤ 10 ngày **VÀ** Critical bugs ≤ 1 **VÀ** 80% ≤ Completion Rate ≤ 95% **VÀ** Carry-over ≤ 2 |
| **🌟 XUẤT SẮC (1.15x)** | Delivery nhanh, chủ động chia task nhỏ, giúp đỡ đồng đội. Code chất lượng cao, ít comment sửa. Chủ động review code. Đóng góp cải thiện coding standards. Hoàn thành vượt target. Mentor junior. | Cycle Time < 5 ngày **VÀ** 0 Carry-over **VÀ** Critical bugs = 0 **VÀ** Completion ≥ 95% |

---

# PHẦN B: RUBRIC CHO TESTER / QA

> **Nguồn dữ liệu:** Linear → Filter: Label = `bug` / `critical-bug` / `bug-prod` + Creator = [QA Name] + State = Confirmed/Fixed
> **Dashboard URL:** `kpi.wealify.com` → Chapter Engineer → Tab "Tester (QA)"

## Chỉ số tính vào hệ số nhân cuối (cả 3 đều tính)

| Chỉ số | Không đạt (0x) | Đạt chuẩn (1.0x) | Xuất sắc (1.15x) | Direction |
|--------|---------------|------------------|-----------------|-----------|
| **Tỷ lệ Bug Rejection (%)** | > 30% | 10–30% | < 10% | ⬇️ Càng thấp càng tốt |
| **Escaped Bugs (bugs lọt Prod)** | > 10 bugs | 3–10 bugs | ≤ 3 bugs | ⬇️ Càng thấp càng tốt |
| **Critical/High Bugs Found** | < 1 bug | 1 bug | ≥ 2 bugs | ⬆️ Càng cao càng tốt |

> 💡 **Cách tính hệ số cuối:** Tích cả 3 chỉ số QA × nhau.
> Ví dụ: Bug Rejection `1.15x` × Escaped Bugs `1.15x` × Bugs Found `1.15x` = **1.52x**

> ℹ️ **Lưu ý hiển thị:** Critical/High Bugs Found không hiển thị trong bảng thành viên (để UI gọn hơn), nhưng **vẫn tính vào hệ số cuối**. Chỉ số này có thể xem qua gauge trên cùng tab QA.

## Bảng đánh giá toàn diện (định tính)

| Mức / Hệ số | Hành vi chuyên môn | Ngưỡng tổng hợp |
|---|---|---|
| **❌ KHÔNG ĐẠT (0x)** | Không phát hiện được bug happy case. Testcase không cover được spec. Nhiều bug report bị reject (invalid/duplicate). Nhiều bugs lọt production ở feature đã QA passed. Miss nhiều edge cases quan trọng. | Bug rejection rate > 30% **HOẶC** Escaped bugs > 10/quý |
| **✅ ĐẠT CHUẨN (1.0x)** | Không lọt bug happy case theo specs. Bug report dễ hiểu, đầy đủ (steps, expected, actual, evidence). Cover được happy path + major edge cases. Ít bugs lọt production. | Bug rejection rate 10–30% **VÀ** Escaped bugs 3–10/quý |
| **🌟 XUẤT SẮC (1.15x)** | Phát hiện được bugs phức tạp ở edge cases, race conditions. Bug reports detailed, dễ reproduce. Chủ động regression test. Gần như zero escaped bugs. Chứng minh test coverage rất tốt. | Bug rejection rate < 10% **VÀ** Critical/High bugs found ≥ 2 **VÀ** Escaped bugs ≤ 3/quý |
