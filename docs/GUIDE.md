# HƯỚNG DẪN SỬ DỤNG MCP KPI DASHBOARD

> Tài liệu này giúp AI Agent hiểu cách sử dụng các tools MCP để trả lời MỌI câu hỏi về KPI.

## Bảng tra cứu: Câu hỏi → Tool nào?

| Câu hỏi người dùng | Tool(s) cần gọi | Cách trả lời |
|---------------------|------------------|--------------|
| "Chapter Sales đang thế nào?" | `kpi_chapter(chapter='SALES')` | Lấy `members[].metrics` → bảng xếp hạng |
| "Chapter Growth đang thế nào?" | `kpi_chapter(chapter='GROWTH')` | Tương tự |
| "So sánh Q1 vs Q2?" | Gọi 2 lần: `kpi_chapter(chapter, quarter='Q1/2026')` + `kpi_chapter(chapter, quarter='Q2/2026')` | So sánh value cùng metricKey |
| "Tháng 5 Sales đạt bao nhiêu?" | `kpi_chapter_monthly(chapter='SALES', month='2026-05')` | GTV + số deal + số KH **từng người** trong tháng |
| "Tháng 4, 5, 6 revenue squad bao nhiêu?" | `kpi_member_kpi(userId)` → xem `engine2.monthly[]` | Revenue squad theo tháng |
| "So sánh tháng 4 vs tháng 5 Sales?" | Gọi 2 lần `kpi_chapter_monthly` với month khác nhau | So sánh GTV cùng member |
| "Tôi là X, tôi cần làm gì để cải thiện?" | `kpi_member_kpi(userId)` + `kpi_rubric_doc(chapter)` | So sánh metrics vs rubric → chỉ ra GAP + action |
| "Ai đang top chapter?" | `kpi_chapter(chapter)` | Sort `members` theo `metrics[].value` |
| "Rubric chấm thế nào?" | `kpi_rubric_doc(chapter)` | Trả về toàn bộ bảng tiêu chuẩn |
| "Lead nào chưa chấm điểm?" | `kpi_sla_status(month)` | Xem `leads[].isComplete` |
| "Toàn công ty đang thế nào?" | `kpi_overview()` | Squad performance, leaderboard, engine-3 |
| "Cảnh báo gì không?" | `kpi_alerts()` | Squad dưới sàn, chạm trần 15% GP, sync trễ |
| "Chính sách thưởng ra sao?" | Đọc `mcp/docs/kpi_bonus_dual_engine_2026_v2.md` | Engine 1/2/3, capping, chia mâm |
| "Hôm nay có gì cần chú ý?" | Đọc `mcp/docs/CALENDAR.md` + `kpi_sla_status` + `kpi_alerts` | Lịch sự kiện + deadline + cảnh báo |
| "Tuần này / thời gian qua có gì đặc biệt?" | Đọc `mcp/docs/CALENDAR.md` + `kpi_chapter` (so sánh 2 quý) + `kpi_alerts` | Timeline + trends + anomalies |
| "Công thức tính thế nào? Lấy ở bảng nào?" | Đọc `mcp/docs/FORMULAS.md` | Engine 1/2/3, DB tables, cột cụ thể |
| "Ngày mai cần chuẩn bị gì?" | Đọc `mcp/docs/CALENDAR.md` + `kpi_scoring_coverage` | Upcoming deadlines + missing data |

---

## Chi tiết data từng tool trả về

### `kpi_member_kpi(userId, quarter)` — ĐÂY LÀ TOOL MẠNH NHẤT
Trả về **toàn bộ** KPI cá nhân, bao gồm:
- `engine1`: GTV, commission, số deals (chỉ SALES)
- `engine2.monthly[]`: **TỪNG THÁNG** — revenue squad, tier %, có đạt sàn không
- `engine2.thresholds`: Tier 1/2/3 mốc revenue
- `engine2.chapterMultiplier`: Hệ số chuyên môn (0x/1.0x/1.15x)
- `engine2.metrics[]`: Từng chỉ số + rubric threshold + actual value + level
- `clawback`: Tiền bị thu hồi
- `totalPayout`: Tổng thu nhập

**Ví dụ trả lời "Tháng 5 revenue bao nhiêu?":**
→ Gọi `kpi_member_kpi(userId)` → xem `engine2.monthly[1]` (tháng 5 = index 1 trong Q2)

### `kpi_chapter(chapter, quarter)` — SO SÁNH MEMBERS CẢ QUÝ
- `members[].metrics[]`: Mỗi member có value + level + metadata
- `metadata` chứa Q1 vs Q2 comparison (q1Gtv, q2Gtv, prevGtv, currentGtv)
- Có thể so sánh quý bằng cách gọi 2 lần với quarter khác nhau

### `kpi_chapter_monthly(chapter, month)` — XEM KPI TỪNG THÁNG ⭐ MỚI

Trả về số liệu **của từng tháng cụ thể**, thay vì cả quý. Đặc biệt hữu ích cho **team Sales**.

**Tham số:**
- `chapter`: `SALES` | `PRODUCT` | `GROWTH` | `ENGINEER`
- `month`: Format `YYYY-MM`, ví dụ `2026-05`

**Với chapter SALES, trả về:**
```json
{
  "chapter": "SALES",
  "month": "2026-05",
  "quarter": "Q2/2026",
  "rubricNote": "Ngưỡng tháng = ngưỡng quý ÷ 3. Sàn/tháng = 20.0 Tỷ, Xuất sắc/tháng = 33.3 Tỷ",
  "summary": { "totalGtv": 160180007131, "totalDeals": 9697, "memberCount": 3 },
  "members": [
    {
      "fullName": "Lê Thị Duyên",
      "gtv": 115133982865,
      "dealCount": 5083,
      "uniqueCustomers": 233,
      "pacing": {
        "level": "EXCELLENT",
        "monthlyTarget": 20000000000,
        "monthlyExcellent": 33333333333,
        "gap": 0,
        "surplus": 81800649532
      }
    }
  ]
}
```

**Giải thích `pacing`:**
- `monthlyTarget` = ngưỡng sàn quý ÷ 3 (ví dụ 60 Tỷ ÷ 3 = 20 Tỷ/tháng)
- `monthlyExcellent` = ngưỡng xuất sắc quý ÷ 3 (ví dụ 100 Tỷ ÷ 3 = 33.3 Tỷ/tháng)
- `level`: `FAIL` (< sàn), `STANDARD` (đạt chuẩn), `EXCELLENT` (xuất sắc)
- `gap`: Số tiền còn thiếu để đạt sàn (chỉ khi FAIL)
- `surplus`: Số tiền vượt trội trên ngưỡng xuất sắc (chỉ khi EXCELLENT)

**Với chapter khác (PRODUCT, ENGINEER, GROWTH):**
- Trả về `squadRevenue` tháng đó + `metrics[]` từ rubric quý (kèm ghi chú là data cả quý)

**Khi nào dùng tool này:**
| Câu hỏi | Cách gọi |
|---------|----------|
| "Tháng 5 Sales đạt bao nhiêu?" | `kpi_chapter_monthly('SALES', '2026-05')` |
| "Duyên tháng 4 vs tháng 5 thế nào?" | Gọi 2 lần: `month='2026-04'` và `month='2026-05'` → so `gtv` |
| "Ai đang dưới sàn tháng này?" | Gọi 1 lần → lọc `pacing.level = 'FAIL'` |
| "Sales Q2 tổng bao nhiêu?" | Gọi 3 lần: tháng 4, 5, 6 → cộng `summary.totalGtv` |

### `kpi_rubric_doc(chapter)` — HIỂU CÁCH CHẤM
- Trả về file markdown đầy đủ với bảng ngưỡng
- Dùng để giải thích "tại sao bạn bị 0x" hoặc "cần thêm bao nhiêu để lên 1.15x"

---

## Cách trả lời "Tôi cần làm gì để cải thiện?"

Khi người dùng hỏi câu này, làm theo 4 bước:

### Bước 1: Lấy KPI hiện tại
```
kpi_member_kpi(userId='...', quarter='Q2/2026')
```
Nếu cần xem từng tháng (đặc biệt Sales):
```
kpi_chapter_monthly(chapter='SALES', month='2026-05')
```

### Bước 2: Lấy rubric
```
kpi_rubric_doc(chapter='SALES') // hoặc chapter tương ứng
```

### Bước 3: So sánh từng metric
Với mỗi metric trong `engine2.metrics[]`:
- Nếu `level = FAIL`: Tính GAP = `thresholdStandardMin - value` → "Bạn cần thêm X để đạt chuẩn"
- Nếu `level = STANDARD`: Tính GAP = `thresholdExcellent - value` → "Bạn cần thêm Y để lên Xuất sắc"
- Nếu `level = EXCELLENT`: → "Bạn đang xuất sắc, duy trì!"

Hoặc dùng `kpi_chapter_monthly` → xem `pacing.level` và `pacing.gap` trực tiếp.

### Bước 4: Đưa ra action plan dựa trên chính sách
Đọc `mcp/docs/kpi_bonus_dual_engine_2026_v2.md` để hiểu:
- Engine 1 (Sales): Hoa hồng 0.15% GTV, chia mâm 65-20-15
- Engine 2 (Tech/Product): Squad tier × Chapter multiplier
- Engine 3: Annual Bonus khi Squad đạt +80% YoY
- Capping: Max 15% Lợi nhuận Gộp, Max 150% Lương

**Ví dụ output cho Sales (theo tháng):**
> "Anh Sơn ơi, GTV tháng 5 đang **17.0 Tỷ** — dưới sàn tháng (20 Tỷ), thiếu **2.9 Tỷ** nữa.
> Chị Duyên tháng 5 đạt **115.1 Tỷ** — vượt xuất sắc, thặng dư +81.8 Tỷ 🌟
> Chị Trà tháng 5 đạt **27.9 Tỷ** — đạt chuẩn, cần thêm 5.4 Tỷ để lên xuất sắc.
> Action cho anh Sơn: Focus khách hàng top 5 volume đang giảm, cần tăng ~3 Tỷ GTV trong tháng 6."

---

## Danh sách chapters có sẵn
- `SALES` — BD/Sales, Engine 1, North Star = Tổng GTV cá nhân/Quý
- `PRODUCT` — PM, Engine 2, North Star = Spec Rejection Rate
- `ENGINEER` — Dev, Engine 2, North Star = Cycle Time
- `GROWTH` / `MARKETING` — Marketing, Engine 2, North Star = Tăng trưởng KH MỚI sử dụng dịch vụ (%/tháng)
  - ⚠️ Trong DB dùng tên `GROWTH`, nhưng rubric chính thức gọi là **Marketing**
  - Cả 2 tên đều hoạt động khi gọi `kpi_rubric_doc('GROWTH')` hoặc `kpi_rubric_doc('MARKETING')`
  - Ngưỡng: Fail < 8%/tháng | Đạt chuẩn 8–15% | Xuất sắc > 15%

