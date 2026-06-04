#!/usr/bin/env node
/**
 * Wealify KPI — MCP server (READ-ONLY)
 * ------------------------------------
 * Exposes the KPI Dashboard's `/service/*` read endpoints to AI agents as MCP
 * tools. The dashboard is the single source of truth; this server only READS.
 * It never writes — scoring lock/unlock/snapshot live inside the dashboard.
 *
 * Config (env):
 *   KPI_BASE_URL          e.g. https://kpi.wealify.com/api/v1   (no trailing slash)
 *   PAPERCLIP_READ_TOKEN  the read-only service token (matches the dashboard env)
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = (process.env.KPI_BASE_URL || 'https://kpi.wealify.com/api/v1').replace(/\/+$/, '');
const TOKEN = process.env.PAPERCLIP_READ_TOKEN || '9a542b2586482b2425b9db79aae2a77ea1fe0fa5697ea5c1205c572e79c31439';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, 'docs');

/** Authenticated GET against the dashboard read API. */
async function call(path, query = {}) {
  const url = new URL(`${BASE}${path}`);
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`KPI API ${res.status} ${res.statusText} @ ${path} — ${text.slice(0, 500)}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const ok = (data) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] });

const server = new McpServer({ name: 'wealify-kpi', version: '1.0.0' });

server.tool(
  'kpi_health',
  'Health/identity probe — confirms the read token works and the dashboard is reachable.',
  async () => ok(await call('/service/health')),
);

server.tool(
  'kpi_scoring_period',
  "Scoring-period state (OPEN | LOCKED) for a month. Use before nudging Leads or reading 'final' numbers.",
  { month: z.string().describe("Month as 'YYYY-MM', e.g. '2026-05'") },
  async ({ month }) => ok(await call(`/service/scoring/${month}`)),
);

server.tool(
  'kpi_scoring_coverage',
  'Active members who still lack data to be scored this month (so a Lead can be reminded before lock).',
  {
    month: z.string().describe("Month as 'YYYY-MM'"),
    chapter: z.enum(['SALES', 'PRODUCT', 'GROWTH', 'ENGINEER']).optional().describe('Filter by chapter'),
  },
  async ({ month, chapter }) => ok(await call(`/service/scoring/${month}/coverage`, { chapter })),
);

server.tool(
  'kpi_member_kpi',
  'Full KPI breakdown for a member (engine1 commission, engine2 squad-bonus, clawback, total payout) for a quarter.',
  {
    userId: z.string().describe('Member UUID'),
    quarter: z.string().optional().describe("Quarter 'QX/YYYY' — defaults to current"),
  },
  async ({ userId, quarter }) => ok(await call(`/service/member/${userId}/kpi`, { quarter })),
);

server.tool(
  'kpi_alerts',
  'Derived alert signals for a quarter: squad below revenue floor, bonus pool hitting the 15% GP cap, sync staleness.',
  { quarter: z.string().optional().describe("Quarter 'QX/YYYY' — defaults to current") },
  async ({ quarter }) => ok(await call('/service/alerts', { quarter })),
);

server.tool(
  'kpi_overview',
  'Company-wide overview for a quarter: per-squad performance, sales leaderboard, chapter averages, engine-3 status. Use for CEO/Finance digests.',
  { quarter: z.string().optional().describe("Quarter 'QX/YYYY' — defaults to current") },
  async ({ quarter }) => ok(await call('/service/overview', { quarter })),
);

server.tool(
  'kpi_chapter',
  'Chapter aggregate + per-member metric breakdown. chapter = SALES | PRODUCT | GROWTH | ENGINEER.',
  {
    chapter: z.enum(['SALES', 'PRODUCT', 'GROWTH', 'ENGINEER']),
    quarter: z.string().optional().describe("Quarter 'QX/YYYY'"),
  },
  async ({ chapter, quarter }) => ok(await call(`/service/chapter/${chapter}`, { quarter })),
);

server.tool(
  'kpi_chapter_monthly',
  'Số liệu chapter theo TỪNG THÁNG. Dùng khi cần xem "tháng 5 Sales đạt bao nhiêu?". Với SALES: trả về GTV, số deal, số KH từng người trong tháng. Với chapter khác: revenue squad tháng đó + metrics.',
  {
    chapter: z.enum(['SALES', 'PRODUCT', 'GROWTH', 'ENGINEER']),
    month: z.string().describe("Tháng cần xem, format 'YYYY-MM', ví dụ '2026-05'"),
  },
  async ({ chapter, month }) => ok(await call(`/service/chapter/${chapter}/monthly`, { month })),
);

server.tool(
  'kpi_members',
  'Active roster: members + Leads (id, name, email, role, chapter, squad) — so you know WHO to message and can iterate. Optional filters: chapter, squadId.',
  {
    chapter: z.enum(['SALES', 'PRODUCT', 'GROWTH', 'ENGINEER']).optional(),
    squadId: z.string().optional(),
  },
  async ({ chapter, squadId }) => ok(await call('/service/members', { chapter, squadId })),
);

server.tool(
  'kpi_rubrics',
  'Rubric thresholds & criteria for a chapter in a quarter. Returns metric keys, fail/standard/excellent thresholds, multipliers, and data sources. Use to understand scoring rules before generating reports.',
  {
    chapter: z.enum(['SALES', 'PRODUCT', 'GROWTH', 'ENGINEER']).optional().describe('Filter by chapter'),
    quarter: z.string().optional().describe("Quarter 'QX/YYYY' — defaults to current"),
  },
  async ({ chapter, quarter }) => ok(await call('/service/rubrics', { chapter, quarter })),
);

server.tool(
  'kpi_sla_status',
  'Tiến độ chấm điểm của Lead theo tháng: Lead nào đã chấm xong cho team, ai đang quá hạn. Dùng để nhắc Lead trước hạn chót (ngày 4 hàng tháng, 17:00 ICT) hoặc đánh dấu vi phạm thời hạn.',
  { month: z.string().describe("Month as 'YYYY-MM', e.g. '2026-05'") },
  async ({ month }) => ok(await call(`/service/scoring/${month}/sla`)),
);

// ---------------------------------------------------------------------------
// RUBRIC DOCUMENTS — Read from mcp/docs/ directory
// Users can update/add rubric files in mcp/docs/ and agents read them via tool.
// ---------------------------------------------------------------------------
const RUBRIC_FILE_MAP = {
  SALES:     'rubric-va-sales-q2-2026.md',
  PRODUCT:   'rubric_chapter_product_q2_2026.md',
  ENGINEER:  'rubric_chapter_dev_q2_2026.md',
  GROWTH:    'Rubric_Chapter_Marketing_Q2_2026.md',  // DB dùng GROWTH, nhưng tài liệu gọi là Marketing
  MARKETING: 'Rubric_Chapter_Marketing_Q2_2026.md',  // Alias — cùng file
};

server.tool(
  'kpi_rubric_doc',
  'Full rubric document (markdown) for a chapter — contains scoring criteria, thresholds, behavioral descriptions, data sources. Use this when asked about "rubric chapter X" or when you need to understand how KPIs are scored. Available: SALES, PRODUCT, ENGINEER, GROWTH, MARKETING.',
  {
    chapter: z.enum(['SALES', 'PRODUCT', 'ENGINEER', 'GROWTH', 'MARKETING']).describe('Chapter name'),
  },
  async ({ chapter }) => {
    const file = RUBRIC_FILE_MAP[chapter];
    if (!file) return { content: [{ type: 'text', text: `No rubric document found for chapter: ${chapter}` }] };
    try {
      const doc = readFileSync(join(DOCS_DIR, file), 'utf-8');
      return { content: [{ type: 'text', text: doc }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Error reading rubric file ${file}: ${e.message}` }] };
    }
  },
);

server.tool(
  'kpi_docs_list',
  'List all available document files in the mcp/docs/ directory. Returns filenames so agents know what reference documents are available.',
  async () => {
    try {
      const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
      return { content: [{ type: 'text', text: JSON.stringify({ docs_dir: 'mcp/docs/', files }, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Error listing docs: ${e.message}` }] };
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`[wealify-kpi-mcp] connected over stdio · base=${BASE}`);
