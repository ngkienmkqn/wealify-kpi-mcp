# HƯỚNG DẪN SỬ DỤNG MCP KPI DASHBOARD

> Tài liệu này giúp AI Agent hiểu cách sử dụng các tools MCP để trả lời MỌI câu hỏi về KPI.

## Bảng tra cứu: Câu hỏi → Tool nào?

| Câu hỏi người dùng | Tool(s) cần gọi | Cách trả lời |
|---------------------|------------------|--------------|
| "Chapter Sales đang thế nào?" | `kpi_chapter(chapter='SALES')` | Lấy `members[].metrics` → bảng xếp hạng |
| "Chapter Growth đang thế nào?" | `kpi_chapter(chapter='GROWTH')` | Tương tự |
| "So sánh Q1 vs Q2?" | Gọi 2 lần: `kpi_chapter(chapter, quarter='Q1/2026')` + `kpi_chapter(chapter, quarter='Q2/2026')` | So sánh value cùng metricKey |
| "Tháng 4, 5, 6 revenue bao nhiêu?" | `kpi_member_kpi(userId)` → xem `engine2.monthly[]` | Có sẵn breakdown theo tháng |
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

### `kpi_chapter(chapter, quarter)` — SO SÁNH MEMBERS
- `members[].metrics[]`: Mỗi member có value + level + metadata
- `metadata` chứa Q1 vs Q2 comparison (q1Gtv, q2Gtv, prevGtv, currentGtv)
- Có thể so sánh quý bằng cách gọi 2 lần với quarter khác nhau

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

### Bước 2: Lấy rubric
```
kpi_rubric_doc(chapter='SALES') // hoặc chapter tương ứng
```

### Bước 3: So sánh từng metric
Với mỗi metric trong `engine2.metrics[]`:
- Nếu `level = FAIL`: Tính GAP = `thresholdStandardMin - value` → "Bạn cần thêm X để đạt chuẩn"
- Nếu `level = STANDARD`: Tính GAP = `thresholdExcellent - value` → "Bạn cần thêm Y để lên Xuất sắc"
- Nếu `level = EXCELLENT`: → "Bạn đang xuất sắc, duy trì!"

### Bước 4: Đưa ra action plan dựa trên chính sách
Đọc `mcp/docs/kpi_bonus_dual_engine_2026_v2.md` để hiểu:
- Engine 1 (Sales): Hoa hồng 0.15% GTV, chia mâm 65-20-15
- Engine 2 (Tech/Product): Squad tier × Chapter multiplier
- Engine 3: Annual Bonus khi Squad đạt +80% YoY
- Capping: Max 15% Lợi nhuận Gộp, Max 150% Lương

**Ví dụ output:**
> "Anh Sơn ơi, GTV Q2 đang 33.6 Tỷ — đã vượt ngưỡng Xuất sắc (>10 Tỷ) 👍
> Nhưng Growth đang -46% — dưới ngưỡng Fail (<-10%). 
> Để lên Đạt chuẩn, cần tăng volume ít nhất 10% so với Q1 (tức cần ~68.5 Tỷ/quý).
> Action: Focus giữ chân 5 khách hàng lớn nhất đang giảm volume."

---

## Danh sách chapters có sẵn
- `SALES` — BD/Sales, Engine 1, North Star = GTV
- `PRODUCT` — PM, Engine 2, North Star = Spec Rejection Rate
- `ENGINEER` — Dev, Engine 2, North Star = Cycle Time
- `GROWTH` — Marketing/Growth, Engine 2, North Star = MAU Growth
- `MARKETING` — (alias của GROWTH trong rubric)
