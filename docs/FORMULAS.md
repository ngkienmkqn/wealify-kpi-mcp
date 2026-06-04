# CÔNG THỨC & NGUỒN DỮ LIỆU — KPI Dashboard

> Tài liệu này giúp AI Agent giải thích **CON SỐ ĐẾN TỪ ĐÂU** và **TÍNH NHƯ THẾ NÀO**.

---

## ENGINE 1: Hoa hồng Doanh số (chỉ chapter SALES)

### Công thức
```
Commission Pool = GTV × 0.15%

Nếu KH organic (utm = null | 'direct' | 'organic' | 'referral'):
  Sale nhận:       80% × Pool
  Lead nhận:       20% × Pool
  Growth Fund:      0%

Nếu KH paid traffic (có UTM khác):
  Sale nhận:       65% × Pool
  Lead nhận:       20% × Pool
  Growth Fund:     15% × Pool
```

### Bảng DB
| Bảng | Cột | Ý nghĩa |
|------|-----|---------|
| `crm_deal` | `gtv` | Giá trị giao dịch (VND) |
| `crm_deal` | `utm_source` | Nguồn traffic → quyết định chia mâm 80/20 hay 65/20/15 |
| `crm_deal` | `owner_user_id` | Sales nào phụ trách deal |
| `crm_deal` | `status` | Chỉ tính deal `WON` |
| `crm_deal` | `closed_at` | Ngày chốt → xác định deal thuộc Q nào |

### Ví dụ
> GTV = 1 tỷ VND, KH organic
> Pool = 1,000,000,000 × 0.0015 = 1,500,000 VND
> Sale nhận = 1,500,000 × 80% = 1,200,000 VND

---

## ENGINE 2: Squad Bonus × Chapter Multiplier (tất cả chapter)

### Bước 1: Xác định Tier theo tháng
```
Revenue tháng < Floor Gate         → Tier 0%   (không đạt sàn)
Floor Gate ≤ Revenue < Tier 1      → Tier 0%   (đạt sàn nhưng chưa tier)
Tier 1 ≤ Revenue < Tier 2         → Tier 50%
Tier 2 ≤ Revenue < Tier 3         → Tier 100%
Revenue ≥ Tier 3                   → Tier 150%
```

### Bước 2: Tính Bonus
```
Avg Tier = Trung bình Tier 3 tháng trong Quý
Bonus = Base Salary × (Avg Tier / 100) × Chapter Multiplier
Cap = min(Bonus, Base Salary × 150%)
```

### Chapter Multiplier
```
Dựa trên rubric (rubric_matrix):
  FAIL       → 0x    (toàn bộ bonus = 0)
  STANDARD   → 1.0x  (nhận đủ)
  EXCELLENT  → 1.15x (nhận thưởng thêm 15%)

Logic: nếu CÓ BẤT KỲ metric FAIL → overall = FAIL
       nếu TẤT CẢ metric EXCELLENT → overall = EXCELLENT
       còn lại → STANDARD
```

### Bảng DB
| Bảng | Cột | Ý nghĩa |
|------|-----|---------|
| `squad_config` | `floor_gate` | Mức sàn revenue tối thiểu |
| `squad_revenue_tier` | `tier1_threshold`, `tier2_threshold`, `tier3_threshold` | 3 mốc revenue |
| `squad_monthly_revenue` | `actual_revenue`, `month` | Revenue thực từng tháng |
| `users_kpi_profile` | `base_salary` | Lương cơ bản → dùng tính bonus |
| `rubric_matrix` | `threshold_*`, `multiplier_*` | Ngưỡng chấm điểm chuyên môn |
| `chapter_metric` | `metric_key`, `metric_value`, `metadata` | Giá trị chỉ số thực tế per member |

---

## ENGINE 3: Annual Breakthrough Bonus (cả năm, level Squad)

### Điều kiện kích hoạt
```
1. YoY GP Growth ≥ 80%     (Lợi nhuận gộp năm nay vs năm trước)
2. Squad đạt sàn ≥ 3/4 quý  (đủ 3 quý vượt Floor Gate)
```

### Số tháng lương thưởng
```
YoY 80–100%   → 1 tháng lương
YoY 100–150%  → 2 tháng lương
YoY ≥ 150%    → 3 tháng lương
```

### Công thức cá nhân
```
Payout = Bonus Months × Base Salary × Avg Chapter Score (4 quý)
```

---

## CAPPING: Trần Chi phí 15% GP

### Công thức
```
Budget = Gross Profit × 15%
Total Requested = Tổng Engine2 + Engine3 tất cả nhân sự

Nếu Total Requested ≤ Budget → không cắt
Nếu Total Requested > Budget → cắt đều:
  Ratio = Budget / Total Requested
  Mỗi người nhận = Bonus × Ratio
```

### Bảng DB
| Bảng | Cột | Ý nghĩa |
|------|-----|---------|
| `system_config` | `capping_ratio` | Tỷ lệ trần (default 0.15 = 15%) |

---

## CLAWBACK: Thu hồi hoa hồng

### Lý do thu hồi
| Lý do | Code | Ý nghĩa |
|-------|------|---------|
| Khách churn | `CHURN` | KH ngừng sử dụng dịch vụ |
| Volume sụt >30% | `DECLINE_OVER_30` | GTV giảm >30% so với lúc chốt |
| Gian lận | `FRAUD` | Phát hiện giao dịch không hợp lệ |
| KYB thất bại | `KYB_FAIL` | KH không qua xác minh doanh nghiệp |
| Blacklist | `RISK_TEAM_BLACKLIST` | Risk team đưa vào danh sách đen |

### Bảng DB
| Bảng | Cột | Ý nghĩa |
|------|-----|---------|
| `clawback_ledger` | `original_commission` | Hoa hồng gốc |
| `clawback_ledger` | `clawback_amount` | Số tiền thu hồi |
| `clawback_ledger` | `reason` | Lý do (enum ở trên) |
| `clawback_ledger` | `status` | PENDING → DEDUCTED hoặc WAIVED |

---

## TỔNG THU NHẬP CÁ NHÂN

```
Total Payout = Engine1 Commission + Engine2 Bonus - Clawback
             (+ Engine3 nếu có, cuối năm)
             → sau đó áp Capping 15% GP nếu cần
```

### Bảng DB snapshot
| Bảng | Cột | Ý nghĩa |
|------|-----|---------|
| `monthly_snapshot` | `engine1_commission` | Hoa hồng Engine 1 tháng đó |
| `monthly_snapshot` | `engine2_squad_bonus` | Bonus Engine 2 tháng đó |
| `monthly_snapshot` | `engine2_chapter_multiplier` | Hệ số chuyên môn (0/1.0/1.15) |
| `monthly_snapshot` | `engine3_annual_bonus` | Bonus năm (nếu có) |
| `monthly_snapshot` | `clawback_deduction` | Tiền clawback trừ tháng đó |
| `monthly_snapshot` | `total_payout` | Tổng thu nhập cuối cùng |
| `monthly_snapshot` | `capping_applied` | Có bị cắt trần không |
| `monthly_snapshot` | `capping_ratio` | Tỷ lệ cắt (VD: 0.85 = nhận 85%) |

---

## CÁC CHỈ SỐ CHAPTER (Rubric Metrics)

| Chapter | Metric Key | Đo cái gì | Bảng nguồn |
|---------|-----------|-----------|------------|
| SALES | `GTV_TOTAL` | Tổng GTV cá nhân cả quý | `crm_deal` (SUM gtv WHERE owner_user_id AND status=WON) |
| SALES | `GTV_GROWTH` | % tăng trưởng GTV vs quý trước | `chapter_metric.metadata` (q1Gtv, q2Gtv → tính %) |
| SALES | `NEW_CUSTOMERS` | Số KH mới có GTV > 10tr | `crm_deal` (COUNT DISTINCT customer_id WHERE registered < 90d AND gtv > 10M) |
| PRODUCT | `SPEC_REJECTION` | % ticket bị trả lại vì spec kém | Linear API → `chapter_metric` |
| ENGINEER | `CYCLE_TIME` | Avg ngày từ In Progress → Done | Linear API → `chapter_metric` |
| GROWTH | `MAU_GROWTH` | % tăng trưởng MAU MoM | Mixpanel API → `chapter_metric` |
| GROWTH | `FIRST_TOPUP_USERS` | % tăng trưởng KH nạp lần đầu | AWS Ledger → `chapter_metric` |

---

## MCP TOOL → DỮ LIỆU MAPPING

| Khi gọi tool | Data đến từ bảng |
|-------------|-----------------|
| `kpi_member_kpi(userId)` | `users_kpi_profile` + `crm_deal` + `squad_monthly_revenue` + `chapter_metric` + `rubric_matrix` + `clawback_ledger` |
| `kpi_chapter(chapter)` | `chapter_metric` + `rubric_matrix` + `users_kpi_profile` |
| `kpi_overview()` | `squad_config` + `squad_monthly_revenue` + `squad_revenue_tier` + `crm_deal` |
| `kpi_rubrics()` | `rubric_matrix` |
| `kpi_rubric_doc(chapter)` | File `mcp/docs/rubric_*.md` (không phải DB) |
| `kpi_sla_status(month)` | `scoring_period` + `monthly_snapshot` |
