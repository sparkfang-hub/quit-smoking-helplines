#!/usr/bin/env node
// Checks every file in data/regions/ against the format described in CONTRIBUTING.md.
// No dependencies: run with `node scripts/validate.mjs`.
// Errors fail the check. A record past its reviewBy date is only a warning:
// stale records stay visible until a maintainer re-checks them.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'data/regions';
const KINDS = ['cessation', 'emotional', 'emergency'];
const STATUSES = ['verified', 'unverified', 'withdrawn'];
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const NULLABLE = ['hours', 'timeZone', 'cost', 'languages', 'crossBorder'];
const REQUIRED = ['id', 'kind', 'name', 'organization', 'destination', 'scope',
  ...NULLABLE, 'status', 'checkedAt', 'reviewBy', 'sources'];
const ALLOWED = new Set([...REQUIRED, 'number', 'note']);
const SOURCE_KEYS = new Set(['url', 'fields', 'sourceUpdatedAt', 'label']);

const errors = [];
const warnings = [];
const ids = new Set();
const today = new Date().toISOString().slice(0, 10);

const isText = (v) => typeof v === 'string' && v.trim() !== '';
const isHttps = (v) => { try { return new URL(v).protocol === 'https:'; } catch { return false; } };

const files = readdirSync(DIR).filter((f) => f.endsWith('.json')).sort();
if (files.length === 0) errors.push(`${DIR}: no region files`);

for (const file of files) {
  const where = join(DIR, file);
  let region;
  try {
    region = JSON.parse(readFileSync(where, 'utf8'));
  } catch (e) {
    errors.push(`${where}: not valid JSON (${e.message})`);
    continue;
  }
  const code = file.replace(/\.json$/, '');
  if (!/^[A-Z]{2}$/.test(code)) errors.push(`${where}: file name must be a two-letter region code, e.g. TW.json`);
  if (region.code !== code) errors.push(`${where}: "code" must be "${code}" to match the file name`);
  if (!isText(region.name)) errors.push(`${where}: "name" is required`);
  for (const key of Object.keys(region)) {
    if (!['code', 'name', 'resources'].includes(key)) errors.push(`${where}: unknown field "${key}"`);
  }
  if (!Array.isArray(region.resources) || region.resources.length === 0) {
    errors.push(`${where}: "resources" must be a non-empty list`);
    continue;
  }

  for (const r of region.resources) {
    const at = `${where} ${r.id ?? '(no id)'}`;
    for (const key of REQUIRED) if (!(key in r)) errors.push(`${at}: missing "${key}"`);
    for (const key of Object.keys(r)) if (!ALLOWED.has(key)) errors.push(`${at}: unknown field "${key}"`);

    if (!new RegExp(`^${code.toLowerCase()}-[a-z0-9-]+$`).test(r.id ?? '')) {
      errors.push(`${at}: "id" must start with "${code.toLowerCase()}-" and use only a-z, 0-9 and -`);
    } else if (ids.has(r.id)) {
      errors.push(`${at}: duplicate id`);
    }
    ids.add(r.id);

    if (!KINDS.includes(r.kind)) errors.push(`${at}: "kind" must be one of ${KINDS.join(', ')}`);
    if (!STATUSES.includes(r.status)) errors.push(`${at}: "status" must be one of ${STATUSES.join(', ')}`);
    for (const key of ['name', 'organization', 'scope']) if (!isText(r[key])) errors.push(`${at}: "${key}" must be text`);
    for (const key of NULLABLE) {
      if (key in r && r[key] !== null && !isText(r[key])) errors.push(`${at}: "${key}" must be text or null`);
    }
    if ('note' in r && !isText(r.note)) errors.push(`${at}: "note" must be text when present`);

    // A phone number must dial exactly that number; otherwise the destination is a web link.
    if ('number' in r) {
      if (!isText(r.number)) errors.push(`${at}: "number" must be text when present`);
      else {
        const tel = `tel:${r.number.replace(/[\s-]/g, '')}`;
        if (r.destination !== tel) errors.push(`${at}: "destination" must be "${tel}" for number ${r.number}`);
      }
    } else if (!isHttps(r.destination)) {
      errors.push(`${at}: without a "number", "destination" must be an https link`);
    }

    for (const key of ['checkedAt', 'reviewBy']) {
      if (!DATE.test(r[key] ?? '')) errors.push(`${at}: "${key}" must be a date like 2026-09-10`);
    }
    if (DATE.test(r.checkedAt ?? '') && DATE.test(r.reviewBy ?? '') && r.reviewBy < r.checkedAt) {
      errors.push(`${at}: "reviewBy" is earlier than "checkedAt"`);
    }
    if (r.status === 'verified' && DATE.test(r.reviewBy ?? '') && r.reviewBy < today) {
      warnings.push(`${at}: past its reviewBy date (${r.reviewBy}); needs a fresh check against the official source`);
    }

    if (!Array.isArray(r.sources) || r.sources.length === 0) {
      errors.push(`${at}: needs at least one official source`);
      continue;
    }
    const labels = new Set();
    for (const s of r.sources) {
      for (const key of Object.keys(s)) if (!SOURCE_KEYS.has(key)) errors.push(`${at}: unknown source field "${key}"`);
      if (!isHttps(s.url)) errors.push(`${at}: source url must be an https link`);
      if (!Array.isArray(s.fields) || s.fields.length === 0 || !s.fields.every(isText)) {
        errors.push(`${at}: source "fields" must list which fields that page confirms`);
      }
      if (!(s.sourceUpdatedAt === null || DATE.test(s.sourceUpdatedAt ?? ''))) {
        errors.push(`${at}: source "sourceUpdatedAt" must be a date or null`);
      }
      if ('label' in s && !isText(s.label)) errors.push(`${at}: source "label" must be text when present`);
      // Several sources need distinct labels so readers can tell the links apart.
      if (r.sources.length > 1) {
        if (!isText(s.label)) errors.push(`${at}: each source needs a "label" when there is more than one`);
        else if (labels.has(s.label)) errors.push(`${at}: source labels must be distinct`);
        labels.add(s.label);
      }
    }
  }
}

for (const w of warnings) console.warn(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);
if (errors.length) {
  console.error(`\n${errors.length} error(s) in ${files.length} region file(s).`);
  process.exit(1);
}
console.log(`OK: ${files.length} region file(s), ${ids.size} resource(s), ${warnings.length} warning(s).`);
