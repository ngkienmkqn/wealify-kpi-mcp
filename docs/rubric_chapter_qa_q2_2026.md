---
type: "chapter_rubric"
quarter: "Q2/2026"
chapter: "QA/Tester"
chapter_type: "ENGINEER"
sub_tab: "QA"
members: ["nhanpt@wealify.com", "thuyetvt@wealify.com"]
metric_tool: "Linear"
status: "Active"
last_updated: "2026-06-08"
---

# RUBRIC CHUYÊN MÔN — CHAPTER QA/TESTER — Q2/2026

> 📌 Mọi chỉ số lấy tự động từ Linear. Self-report vô hiệu.
> **Lưu ý hệ thống:** QA/Tester thuộc `chapterType = ENGINEER` trong DB, hiển thị qua tab "Tester (QA)" trên dashboard.

**Nguồn dữ liệu:** Linear → Filter: Label = `bug` / `critical-bug` / `bug-prod` + Creator = QA member + State = Confirmed/Fixed
**Dashboard URL:** `kpi.wealify.com` → Chapter Engineer → Tab "Tester (QA)"

---

## BẢNG RUBRIC

| Chỉ số | Không đạt (0x) | Đạt chuẩn (1.0x) | Xuất sắc (1.15x) | Direction |
|--------|:---:|:---:|:---:|:---:|
| **Tỷ lệ Bug Rejection (%)** | > 30% | 10–30% | < 10% | ⬇️ lower |
| **Escaped Bugs on Prod** | > 10 bugs | 3–10 bugs | ≤ 3 bugs | ⬇️ lower |
| **Critical/High Bugs Found** | < 1 bug | 1 bug | ≥ 2 bugs | ⬆️ higher |

> 💡 **Hệ số cuối = Bug Rejection × Escaped Bugs × Bugs Found**
> Ví dụ: `1.15x × 1.15x × 1.15x = 1.52x` (tất cả xuất sắc)

---

## HIỂN THỊ TRÊN DASHBOARD

| Chỉ số | Gauge (phía trên) | Cột bảng thành viên | Tính vào hệ số cuối |
|--------|:-----------------:|:-------------------:|:-------------------:|
| Tỷ lệ Bug Rejection | ✅ | ✅ | ✅ |
| Escaped Bugs on Prod | ✅ | ✅ | ✅ |
| Critical/High Bugs Found | ✅ | ❌ (ẩn để gọn UI) | ✅ |

> Critical/High Bugs Found không hiển thị trong bảng thành viên nhưng **vẫn được tính vào hệ số cuối**.

---

## NGƯỠNG CHI TIẾT (từ DB — Q2/2026)

| metricKey | thresholdFail | thresholdStandardMin | thresholdStandardMax | thresholdExcellent | direction |
|-----------|:---:|:---:|:---:|:---:|:---:|
| `BUG_REJECTION_RATE` | 30 | 10 | 30 | 10 | lower |
| `ESCAPED_BUGS` | 10 | 3 | 10 | 3 | lower |
| `CRITICAL_BUGS_FOUND` | 1 | 1 | 1 | 2 | higher |

---

## ĐỊNH NGHĨA CHỈ SỐ

### Bug Rejection Rate
- **Tính:** `(Số bug báo bị reject / Tổng bug đã báo) × 100%`
- **Reject** = bug bị mark là `Invalid`, `Duplicate`, hoặc `Not a Bug` bởi Dev/Lead
- **Nguồn:** Linear label + state transitions

### Escaped Bugs on Prod
- **Tính:** Số bug critical/high xuất hiện trên Production ở feature QA đã test-passed trong quý
- **Nguồn:** Linear filter: label=`bug-prod` + assignee=QA member + created in quarter

### Critical/High Bugs Found
- **Tính:** Số bug severity `critical` hoặc `high` do QA member tạo ra và được xác nhận (Confirmed/Fixed)
- **Mục đích:** Đo khả năng phát hiện bug quan trọng trước khi lên Prod
- **Nguồn:** Linear filter: label=`critical-bug` hoặc `high-bug` + creator=QA member

---

## ĐÁNH GIÁ ĐỊNH TÍNH

| Mức / Hệ số | Hành vi chuyên môn |
|---|---|
| **❌ KHÔNG ĐẠT (0x)** | Không phát hiện được bug happy case. Testcase không cover được spec. Nhiều bug report bị reject (invalid/duplicate). Nhiều bugs lọt production ở feature đã QA passed. Miss nhiều edge cases quan trọng. Chỉ làm task được giao, không viết testcase. |
| **✅ ĐẠT CHUẨN (1.0x)** | Không lọt bug happy case theo specs. Bug report dễ hiểu, đầy đủ (steps, expected, actual, evidence). Cover được happy path + major edge cases. Ít bugs lọt production. Có ý thức review specs trước khi test. |
| **🌟 XUẤT SẮC (1.15x)** | Phát hiện được bugs phức tạp ở edge cases, race conditions. Bug reports detailed, dễ reproduce. Chủ động regression test. Gần như zero escaped bugs. Test coverage rất tốt, regression testing chặt chẽ. Chủ động share kiến thức, có docs sharing hoặc seminar. |
