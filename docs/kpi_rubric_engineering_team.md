# KPI & Bonus "Dual-Engine" Q2/2026 — Engineering Chapter

---

```yaml
type: "chapter_engineering"
quarter: "Q2/2026"
chapter: "Engineering (Dev & Test)"
chapter_lead: "@longvh"
metric_tool: "Linear"
status: "Draft"
```

---

## 📌 NGUYÊN TẮC PHÂN XỬ

1. Tài liệu này là **cơ sở duy nhất** để tính Hệ số chuyên môn cá nhân (Engine 2) khi kết thúc Quý.
2. Các chỉ số được lấy **tự động từ Linear**. Mọi kết quả tự báo cáo (self-report) bằng miệng / file cá nhân ngoại lai đều **vô hiệu**.
3. Document này sẽ được **Khóa (Read-only)** vào ngày 1 của Quý. Mọi sự thay đổi ngưỡng giữa chừng phải có Approve từ CEO và thông báo công khai cho toàn Chapter trên Lark.

---

# PHẦN A: RUBRIC CHO DEVELOPER

> **Nguồn dữ liệu:** Linear → Workspace Insights, filter theo Assignee + Quarter | **Dashboard URL:** `[Dán link tại đây]`

| Mức độ / Hệ số | Cột 1: Năng lực chuyên môn (Định tính) | Cột 2: Data đo lường tự động (Linear) | Cột 3: Ngưỡng điều kiện (Threshold) |
|---|---|---|---|
| ❌ **KHÔNG ĐẠT (0x)** | Thiếu khả năng tự quản lý tiến độ. Thường xuyên block mà không escalate. Không chia nhỏ task hợp lý. Gây ra bug nghiêm trọng trên production. Không hoàn thành công việc được giao. Nhiều task bị cancel hoặc rollback. Chỉ làm task được giao, không viết docs. | 1. Có ≥ 3 sub-issues bị kéo dài quá 1 cycle mà không có lý do hợp lệ. 2. Gây ra ≥ 2 critical bugs lộ Prod trong quý. 3. Tỷ lệ Sub-issue Done / Assigned < 60%. | **Cycle Time > 10 ngày** HOẶC **Critical bugs on Prod ≥ 2** HOẶC **Completion Rate < 60%** |
| ✅ **ĐẠT CHUẨN (1.0x)** | Tự quản lý tiến độ tốt. Biết chia nhỏ task, estimate hợp lý. Escalate kịp thời khi bị block. Hiếm khi gây bug trên production. Tuân thủ coding standards. Hoàn thành đầy đủ công việc được giao. Có planning rõ ràng, ít task bị miss. Có ý thức đóng góp hệ thống, tham gia review / fix tech debt khi được yêu cầu. | 1. Hoàn thành sub-issues đúng Sprint Baseline. Cycle Time ổn định qua các sprint. 2. Critical bugs on Prod ≤ 1. 3. Tỷ lệ completion ≥ 80%. | **5 ngày ≤ Cycle Time ≤ 10 ngày** VÀ **Critical bugs on Prod ≤ 1** VÀ **80% ≤ Completion Rate ≤ 95%** |
| 🌟 **XUẤT SẮC (1.15x)** | Delivery nhanh, chủ động chia task nhỏ, giúp đỡ đồng đội. Estimate chính xác, hiếm khi trễ deadline. Code chất lượng cao, ít comment sửa. Chủ động review code cho team. Đóng góp cải thiện coding standards/linting rules. Hoàn thành vượt target. Chủ động nhận thêm task khi xong sớm. Chủ động tạo shared component, viết technical doc (điểm cộng: mentor junior). Là người dẫn dắt kỹ thuật trong team. | 1. Không có sub-issue nào bị carry-over giữa các cycle. 2. Zero critical bugs on Prod. Có đóng góp PR review cho ≥ 3 PRs của đồng đội/quý. 3. Completion ≥ 95%. Có nhận thêm ≥ 2 unplanned tasks và hoàn thành. Có ≥ 1 đóng góp (trong triage). | **Cycle Time < 5 ngày** VÀ **0 issue carry-over** VÀ **Critical bugs = 0** VÀ **Review PRs ≥ 3/quý** VÀ **Completion ≥ 95%** VÀ **Contribution ≥ 2** VÀ **Được Lead xác nhận** |

---

# PHẦN B: RUBRIC CHO TESTER / QA

> **Nguồn dữ liệu:** Linear → Filter: Label = `bug` / `critical-bug` / `bug-prod` + Creator = [QA Name] + State = Confirmed/Fixed | **Dashboard URL:** `[Dán link tại đây]`

| Mức độ / Hệ số | Cột 1: Năng lực chuyên môn (Định tính) | Cột 2: Data đo lường tự động (Linear) | Cột 3: Ngưỡng điều kiện (Threshold) |
|---|---|---|---|
| ❌ **KHÔNG ĐẠT (0x)** | Không phát hiện được bug happy case. Testcase không cover được spec. Nhiều bug report bị reject (invalid). Nhiều bugs lọt production ở feature đã QA passed (bug critical). Test coverage thiếu, miss nhiều edge cases quan trọng. Chỉ làm task được giao, không viết testcase. | 1. Tỷ lệ bug bị reject (Invalid/Duplicate) > 30%. Không viết testcase cho issue có spec phức tạp. Không có checklist productions cho những issue phức tạp. 2. Escaped bugs/quý ở features đã test-passed > 10 | **Bug rejection rate > 30%** HOẶC **Escaped bugs > 10/quý** |
| ✅ **ĐẠT CHUẨN (1.0x)** | Không lọt bug happy case theo specs, bug report dễ hiểu. Cover được happy path + major edge cases. Ít bugs lọt production. Feature chính đều được cover tốt. Có ý thức đóng góp hệ thống, tham gia review specs. | 1. Bug rejection rate ≤ 30%. Bug reports đầy đủ (steps, expected, actual, evidence). Viết testcase đầy đủ, rõ ràng, cover được specs. 2. Escaped bugs ≤ 10/quý. | **Bug rejection rate ≤ 30%** VÀ **Escaped bugs ≤ 10/quý** |
| 🌟 **XUẤT SẮC (1.15x)** | Phát hiện được bugs phức tạp ở edge cases, race conditions. Bug reports detailed, dễ reproduce. Chủ động regression test. Gần như zero escaped bugs. Chứng minh test coverage rất tốt, regression testing chặt chẽ. Chủ động share kiến thức. | 1. Bug rejection rate < 10%. Phát hiện ≥ 2 critical/high priority bugs. Chủ động improve test coverage. 2. Escaped bugs ≤ 3/quý. 3. Có docs sharing hoặc seminar. Có ≥ 1 đóng góp (trong triage). | **Bug rejection rate < 10%** VÀ **Critical/High bugs found ≥ 2** VÀ **Escaped bugs ≤ 3/quý** VÀ **Contribution ≥ 1** VÀ **Được Lead xác nhận** |
