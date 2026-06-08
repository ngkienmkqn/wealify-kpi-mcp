---
type: "chapter_rubric"
quarter: "Q2/2026"
chapter: "Dev"
chapter_lead: "@longvh"
metric_tool: "Linear"
status: "Active"
last_updated: "2026-06-08"
---

# RUBRIC CHUYÊN MÔN — CHAPTER DEVELOPER — Q2/2026

> 📌 Mọi chỉ số lấy tự động từ Linear. Self-report vô hiệu. Khóa Read-only ngày 1/4.

**North Star Metric:** Cycle Time trung bình (ngày) từ "In Progress" → "Done/Shipped"
**Nguồn dữ liệu:** Report "Cycle Time Q2/2026" trên Linear
**Dashboard URL:** `kpi.wealify.com` → Chapter Engineer → Tab "Developer (Dev)"

---

## BẢNG RUBRIC — CHỈ SỐ CỐT LÕI (tính vào hệ số nhân)

| Mức / Hệ số | Cycle Time TB | Critical Bugs on Prod | Tỷ lệ Hoàn thành | Issue Carry-over |
|:---|:---:|:---:|:---:|:---:|
| **❌ KHÔNG ĐẠT (0x)** | > 10 ngày | ≥ 2 bugs | < 80% | ≥ 3 issues |
| **✅ ĐẠT CHUẨN (1.0x)** | 5–10 ngày | ≤ 1 bug | 80–95% | 1–2 issues |
| **🌟 XUẤT SẮC (1.15x)** | < 5 ngày | 0 bugs | ≥ 95% | 0 issues |

> **Hệ số cuối = Cycle Time × Critical Bugs × Completion Rate × Carry-over**
> Ví dụ: `1.0x × 1.15x × 1.0x × 1.15x = 1.32x`

---

## BẢNG RUBRIC — CHỈ SỐ BONUS (chỉ hiển thị gauge, KHÔNG tính hệ số nhân)

| Mức / Hệ số | Review PRs | Đóng góp (Contribution) |
|:---|:---:|:---:|
| **❌ KHÔNG ĐẠT** | 0 PRs | 0 |
| **✅ ĐẠT CHUẨN** | 1–2 PRs | 1 |
| **🌟 XUẤT SẮC** | ≥ 3 PRs | ≥ 2 |

> ⚠️ Hai chỉ số này **không tính vào hệ số nhân cuối** (vì `multiplierFail = 0x` sẽ归零 toàn bộ thưởng).
> Chúng chỉ hiển thị trên gauge để khuyến khích văn hóa review & đóng góp kỹ thuật.

---

## NGƯỠNG CHI TIẾT (từ DB — Q2/2026)

| metricKey | thresholdFail | thresholdStandardMin | thresholdStandardMax | thresholdExcellent | Ghi chú |
|-----------|:---:|:---:|:---:|:---:|:---|
| `CYCLE_TIME` | 10 | 5 | 10 | 5 | ngày · direction=lower |
| `CRITICAL_BUGS` | 2 | 0 | 1 | 0 | số bugs · direction=lower |
| `COMPLETION_RATE` | 60 | 80 | 95 | 95 | % · direction=higher |
| `ISSUE_CARRY_OVER` | 3 | 1 | 2 | 0 | số issues · direction=lower |
| `REVIEW_PRS` *(bonus)* | 0 | 1 | 2 | 3 | PRs · direction=higher |
| `CONTRIBUTION` *(bonus)* | 0 | 1 | 1 | 2 | tasks · direction=higher |
