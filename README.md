# Wealify KPI — MCP (read-only)

> **Dành cho AI agent (Paperclip và các agent khác).** Đây là cách hệ thống KPI Dashboard
> **chia sẻ dữ liệu** cho agent đọc, và **hướng dẫn cách dùng**. Đọc hết file này là biết
> gọi endpoint nào, cú pháp ra sao, auth thế nào, và lấy được số gì.

---

## 1. Nguyên tắc (đọc trước khi code)

- **`kpi.wealify.com` (dashboard) là BỘ NÃO / nguồn sự thật duy nhất.** Mọi *thông số* (điểm, hệ số, commission, bonus, capping, trạng thái khoá) **do dashboard tính và quyết**.
- **Agent chỉ ĐỌC** qua API này. **KHÔNG ghi. KHÔNG đụng database trực tiếp.** Không có connection string, không có SQL — chỉ có HTTP read endpoints.
- **Sai số → sửa trong dashboard, không sửa ở agent.** Agent chỉ là lớp đọc + đi báo/nhắc/tạo phiếu.
- Mọi bước **đổi trạng thái** (mở/khoá chấm điểm tháng, chốt quý, khoá snapshot) **nằm trong dashboard** — chạy bằng cron của dashboard hoặc CEO bấm tay. **Không expose cho agent** (token agent là OBSERVER read-only, gọi vào sẽ bị 403).

---

## 2. Auth

Mọi request kèm header:

```
Authorization: Bearer <PAPERCLIP_READ_TOKEN>
```

- Token này map sang identity **OBSERVER (read-only)**. Không gọi được bất kỳ endpoint ghi nào.
- Token do **admin dashboard cấp** (env `PAPERCLIP_READ_TOKEN` trên backend). Đặt **cùng giá trị** ở phía agent.
- Thiếu/sai token → `401`. Server backend mà chưa set token → từ chối tất cả (fail-closed).

---

## 3. Cách dùng

### Cách A — qua MCP server (khuyến nghị)

```bash
cd mcp
npm install
# Token đã được tích hợp sẵn — không cần tạo file .env
```

Thêm vào MCP config của agent (ví dụ):

```json
{
  "mcpServers": {
    "wealify-kpi": {
      "command": "node",
      "args": ["/đường/dẫn/tới/mcp/index.mjs"]
    }
  }
}
```

> **Lưu ý:** Token read-only và Base URL đã được tích hợp sẵn trong code. Nếu cần override, set env `KPI_BASE_URL` và `PAPERCLIP_READ_TOKEN`.

**Tools** agent sẽ thấy:

| Tool | Tham số | Trả về |
|------|---------|--------|
| `kpi_health` | — | Xác nhận token + dashboard sống |
| `kpi_scoring_period` | `month` ('YYYY-MM') | Trạng thái chấm điểm tháng: OPEN / LOCKED |
| `kpi_scoring_coverage` | `month`, `chapter?` | Member chưa có data để chấm (để nhắc Lead) |
| `kpi_member_kpi` | `userId`, `quarter?` | KPI đầy đủ 1 member (engine1/2, bonus, clawback, total) |
| `kpi_alerts` | `quarter?` | Cảnh báo: squad dưới sàn · chạm trần 15% GP · sync trễ |
| `kpi_overview` | `quarter?` | Toàn cảnh: squad · leaderboard · chapter avg · engine-3 |
| `kpi_chapter` | `chapter`, `quarter?` | Tổng hợp 1 chapter + per-member |
| `kpi_chapter_monthly` | `chapter`, `month` | **Theo tháng**: GTV + số deal + số KH từng người (Sales), revenue squad (khác) |
| `kpi_members` | `chapter?`, `squadId?` | **Roster**: member + Lead + email (biết DM ai / lặp qua) |
| `kpi_rubrics` | `chapter?`, `quarter?` | **Rubric**: ngưỡng fail/standard/excellent + hệ số + data source |
| `kpi_sla_status` | `month` | **Tiến độ chấm điểm**: Lead nào đã chấm xong, ai đang quá hạn |
| `kpi_rubric_doc` | `chapter` | **Rubric Document**: toàn bộ nội dung file rubric (markdown) — tiêu chí định tính, ngưỡng, nguồn data |

### Cách B — gọi HTTP trực tiếp (REST)

Base URL: `https://kpi.wealify.com/api/v1` · prefix nhóm: `/service` · method: `GET`.

```bash
curl -H "Authorization: Bearer $PAPERCLIP_READ_TOKEN" \
     https://kpi.wealify.com/api/v1/service/scoring/2026-05/coverage?chapter=SALES
```

---

## 4. Endpoints (read-only)

| Path | Query | Mô tả |
|------|-------|-------|
| `GET /service/health` | — | `{ ok, consumer, mode:"read-only" }` |
| `GET /service/scoring/:month` | — | Trạng thái tháng (`:month` = `YYYY-MM`) |
| `GET /service/scoring/:month/coverage` | `chapter?` | Ai chưa có data chấm điểm tháng |
| `GET /service/member/:userId/kpi` | `quarter?` | KPI đầy đủ của member |
| `GET /service/alerts` | `quarter?` | Tín hiệu cảnh báo dẫn xuất |
| `GET /service/overview` | `quarter?` | Toàn cảnh công ty (squad · leaderboard · chapter avg) |
| `GET /service/chapter/:chapter` | `quarter?` | Tổng hợp chapter + per-member |
| `GET /service/chapter/:chapter/monthly` | `month` | Theo tháng: GTV per member (Sales), squad revenue (khác) |
| `GET /service/members` | `chapter?` `squadId?` | Roster: member + Lead + email |
| `GET /service/rubrics` | `chapter?` `quarter?` | Rubric: ngưỡng chấm điểm + hệ số |
| `GET /service/scoring/:month/sla` | — | Tiến độ chấm điểm: Lead nào đúng hạn, ai trễ |

### Response shapes

`GET /service/scoring/2026-05`
```json
{ "month": "2026-05", "state": "LOCKED", "lockedAt": "2026-06-05T16:00:00.000Z", "snapshotsGenerated": true }
```

`GET /service/scoring/2026-05/coverage?chapter=SALES`
```json
{
  "month": "2026-05", "quarter": "Q2/2026", "chapter": "SALES",
  "total": 8, "scored": 6, "unscoredCount": 2,
  "unscored": [ { "userId": "…", "fullName": "Tuấn Lê", "email": "…", "chapterType": "SALES" } ]
}
```

`GET /service/alerts?quarter=Q2/2026`
```json
{
  "quarter": "Q2/2026", "count": 2,
  "alerts": [
    { "type": "SQUAD_FLOOR_MISS", "severity": "HIGH", "message": "Squad Sales B: 1 tháng dưới sàn doanh thu.", "meta": { "squad": "Sales B" } },
    { "type": "CAPPING_HIT", "severity": "MEDIUM", "message": "Quỹ commission vượt trần 15% GP.", "meta": { "pool": 0, "cap": 0 } }
  ]
}
```

`GET /service/member/:userId/kpi?quarter=Q2/2026` → `{ quarter, user, engine1, engine2, clawback, totalPayout }`
(chi tiết engine1 = commission, engine2 = squad-tier × chapter-multiplier + capping, clawback = hoàn phí).

`GET /service/rubrics?chapter=SALES&quarter=Q2/2026`
```json
{
  "quarter": "Q2/2026", "chapter": "SALES", "count": 3,
  "rubrics": [
    {
      "chapterType": "SALES", "metricKey": "TOTAL_GTV", "metricLabel": "Tổng GTV Nạp Tiền",
      "thresholds": { "fail": 3000000000, "standardMin": 3000000000, "standardMax": 10000000000, "excellent": 10000000000 },
      "multipliers": { "fail": 0, "standard": 1, "excellent": 1.15 },
      "dataSource": "CRM", "locked": true, "lockedAt": "2026-04-01T00:00:00.000Z"
    }
  ]
}
```

`GET /service/scoring/2026-05/sla`
```json
{
  "month": "2026-05", "quarter": "Q2/2026",
  "deadline": "2026-06-04T10:00:00.000Z", "isPastDeadline": false,
  "leads": [
    { "userId": "…", "fullName": "Minh Sơn", "email": "son@wealify.com", "chapterType": "SALES", "teamTotal": 8, "teamScored": 6, "teamUnscored": 2, "isComplete": false, "isOverdue": false }
  ],
  "summary": { "totalLeads": 4, "completedLeads": 2, "overdueLeads": 0 }
}
```

---

## 5. KHÔNG có ở đây (cố ý)

Các thao tác **ghi/đổi trạng thái** không nằm trong MCP này — chúng sống trong dashboard:

- Mở/khoá chấm điểm tháng, chốt quý, khoá snapshot → **scheduler của dashboard tự chạy** (ngày 1 mở · ngày 5 khoá · cuối quý chốt) hoặc **CEO bấm** (`POST /scoring/...`, cần JWT + role CEO).
- Ký duyệt giải ngân hoa hồng → **Lark Approval** (người thật: CEO + Kế Toán).

Agent gọi mấy cái đó bằng token OBSERVER → **403**. Đúng thiết kế: agent không bao giờ làm hỏng được dữ liệu lương.

---

## 6. Setup token (cho admin dashboard)

```bash
openssl rand -hex 32          # sinh token
```

- Đặt vào backend `.env`: `PAPERCLIP_READ_TOKEN=<token>` (+ lưu 1Password "Wealify KPI Backend").
- Đặt cùng giá trị vào env của agent (`PAPERCLIP_READ_TOKEN`).
- Rotate: đổi cả 2 nơi cùng lúc.

---

*Nguồn: backend `src/modules/service/` (read API) + `src/common/guards/service-token.guard.ts` (auth). Mọi thay đổi shape API → cập nhật file README này để agent khác đọc đúng.*
