#!/usr/bin/env node
/**
 * Activity State Fixture Static Guardrail
 * Vanilla Node script, no external dependencies.
 *
 * Uses regex-based source validation plus `node --check` syntax validation.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const FIXTURE_PATH = path.join(__dirname, "../../src/data/activityStateFixtureCatalog.js");
const VIEW_PATH = path.join(__dirname, "../../src/views/activityStateReadOnlyView.js");
const ALLOWED_STATES = [
  "not_started",
  "orientation_available",
  "in_progress",
  "evidence_present",
  "needs_review",
  "ready_for_human_validation",
  "human_validated",
  "blocked",
  "not_applicable"
];
const REQUIRED_FIELDS = [
  "activityId",
  "title",
  "area",
  "state",
  "stateLabel",
  "stateDescription",
  "evidenceRefs",
  "validationRequired",
  "validationStatus",
  "blockedReason",
  "readonly",
  "exampleData",
  "containsPersonalData",
  "containsStudentData",
  "storageEnabled",
  "source"
];
const FORBIDDEN_TERMS = [
  "fetch",
  "XMLHttpRequest",
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "OAuth",
  "cloud",
  "backend",
  "api",
  "autosave",
  "save",
  "DOCX",
  "PDF",
  "subentro",
  "ownership",
  "presa in carico",
  "studenti reali",
  "dati sanitari",
  "token",
  "secret",
  "api key",
  "certificato",
  "conforme",
  "validato dal sistema",
  "registro ufficiale",
  "approvato automaticamente",
  "salvato automaticamente"
];

function fail(msg) {
  console.error("GUARDRAIL FAIL:", msg);
  process.exit(1);
}

function ok(msg) {
  console.log("GUARDRAIL OK:", msg);
}

if (!fs.existsSync(FIXTURE_PATH)) fail(`Fixture file not found: ${FIXTURE_PATH}`);
if (!fs.existsSync(VIEW_PATH)) fail(`Activity state view file not found: ${VIEW_PATH}`);

const content = fs.readFileSync(FIXTURE_PATH, "utf8");
const viewContent = fs.readFileSync(VIEW_PATH, "utf8");

try {
  execSync(`node --check "${FIXTURE_PATH}"`, { stdio: ["ignore", "ignore", "inherit"] });
  execSync(`node --check "${VIEW_PATH}"`, { stdio: ["ignore", "ignore", "inherit"] });
} catch (err) {
  fail(`Syntax check failed: ${err.message}`);
}
ok("Syntax check passed");

const hasReadonlyTrue = /readonly:\s*true/.test(content);
const hasExampleDataTrue = /exampleData:\s*true/.test(content);
const hasStorageEnabledFalse = /storageEnabled:\s*false/.test(content);
if (!hasReadonlyTrue || !hasExampleDataTrue || !hasStorageEnabledFalse) {
  fail("Fixture flag contract violated: readonly/exampleData/storageEnabled");
}
ok("Fixture flags are readonly=true, exampleData=true, storageEnabled=false");

if (!/window\.activityStateFixtureCatalog\s*=\s*activityStateFixtureCatalog/.test(content)) {
  fail("Fixture must expose window.activityStateFixtureCatalog for the read-only view binding");
}
ok("Fixture exposes window.activityStateFixtureCatalog");

if (!/window\.activityStateFixtureCatalog/.test(viewContent)) {
  fail("Activity state view must read window.activityStateFixtureCatalog");
}
ok("Activity state view reads window.activityStateFixtureCatalog");

if (!/activityStateCatalog\.activities\s*\|\|\s*\[\]/.test(viewContent)) {
  fail("Activity state view must render activityStateCatalog.activities");
}
ok("Activity state view renders activityStateCatalog.activities");

if (/<\s*(button|input|form)[^>]*>/i.test(viewContent)) {
  fail("Activity state view must not render operative controls");
}
ok("Activity state view has no operative input/form/button controls");

const foundStates = Array.from(content.matchAll(/state:\s*"([^"]+)"/g)).map((m) => m[1]);
const uniqueStates = Array.from(new Set(foundStates));

ALLOWED_STATES.forEach((state) => {
  if (!uniqueStates.includes(state)) fail(`Missing allowed state: ${state}`);
});
ok("All allowed states are present in fixture");

uniqueStates.forEach((state) => {
  if (!ALLOWED_STATES.includes(state)) fail(`Unexpected state in fixture: ${state}`);
});
ok("No unexpected states in fixture");

const foundIds = Array.from(content.matchAll(/activityId:\s*"([^"]+)"/g)).map((m) => m[1]);
if (foundIds.length !== new Set(foundIds).size) fail("Duplicate activityId found");
if (foundIds.length === 0) fail("Activity fixture must contain at least one activity card");
ok(`All activityIds are unique (${foundIds.length} activities)`);

REQUIRED_FIELDS.forEach((field) => {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escaped}:`, "g");
  const matches = content.match(regex);
  if (!matches || matches.length === 0) fail(`Required field missing: ${field}`);
});
ok("All required fields are present");

FORBIDDEN_TERMS.forEach((term) => {
  if (content.includes(term)) fail(`Forbidden term found in fixture: ${term}`);
  if (viewContent.includes(term)) fail(`Forbidden term found in activity state view: ${term}`);
});
ok("No forbidden terms found in fixture or activity state view");

console.log("\nGUARDRAIL PASSED: activity state fixture and view binding are valid.");
