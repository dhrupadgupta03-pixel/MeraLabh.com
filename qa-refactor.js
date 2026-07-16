#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = __dirname;
const reportPath = path.join(root, "qa-report.md");
const expectedPages = {
  "index.html": "hub-page",
  "ayushman-card-kya-hai/index.html": "content-spoke",
  "pmjay-full-form/index.html": "content-spoke",
  "ayushman-card-benefits/index.html": "content-spoke",
  "ayushman-card-disease-list-coverage/index.html": "content-spoke",
  "ayushman-card-eligibility/index.html": "tool-flow",
  "ayushman-card-beneficiary-list-name-check/index.html": "guide-process",
  "ayushman-card-download/index.html": "guide-process",
  "ayushman-card-download-aadhaar-se/index.html": "guide-process",
  "ayushman-card-download-mobile-number-se/index.html": "guide-process",
  "ayushman-card-documents-required/index.html": "guide-process",
  "ayushman-card-status-check/index.html": "troubleshooting",
  "ayushman-card-pending-status/index.html": "troubleshooting",
  "ayushman-card-rejected-status/index.html": "troubleshooting",
  "ayushman-card-not-showing/index.html": "troubleshooting",
  "ayushman-card-hospital-list-use/index.html": "guide-process",
  "ayushman-card-kaise-use-kare/index.html": "guide-process",
  "ayushman-card-validity-changes/index.html": "update-sensitive",
  "ayushman-card-correction/index.html": "guide-process",
};

const bannedPhrases = [
  "Open next page",
  "Next journey",
  "Related pages",
  "Yah point agla sahi page chunne mein madad karta hai.",
  "page kholkar agla useful step samjhein.",
  "Reviewed in this workflow",
  "Intent focus",
  "Evidence 1",
  "Evidence 2",
];

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function internalLinks(html) {
  return [...html.matchAll(/href="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => href && !href.startsWith("http") && !href.startsWith("mailto:") && !href.startsWith("#"));
}

function resolveInternalLink(filePath, href) {
  const resolved = path.resolve(path.dirname(filePath), href);
  const statsPath = resolved.endsWith("/") ? path.join(resolved, "index.html") : resolved;
  if (fs.existsSync(statsPath) && fs.statSync(statsPath).isFile()) return statsPath;
  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    const candidate = path.join(resolved, "index.html");
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function run() {
  const failures = [];
  const passes = [];

  for (const [relativePath, family] of Object.entries(expectedPages)) {
    const filePath = path.join(root, relativePath);
    if (!fileExists(filePath)) {
      failures.push(`${relativePath}: file missing`);
      continue;
    }

    const html = read(filePath);

    if (!html.includes('lang="en"')) failures.push(`${relativePath}: lang=\"en\" missing`);
    if (!html.includes(`data-template-family="${family}"`)) failures.push(`${relativePath}: template family marker missing or wrong`);
    if (countMatches(html, /<h1\b/g) !== 1) failures.push(`${relativePath}: expected exactly one h1`);
    if (!html.includes('data-qa="hero"')) failures.push(`${relativePath}: hero marker missing`);
    if (!html.includes("<nav class=\"breadcrumbs\">")) failures.push(`${relativePath}: breadcrumbs missing`);
    if (!html.includes("<p class=\"eyebrow\">")) failures.push(`${relativePath}: eyebrow missing`);
    if (!html.includes("<div class=\"lead\"><p>")) failures.push(`${relativePath}: lead paragraph missing`);
    if (countMatches(html, /<article class="card stack-lg">[\s\S]*?<p class="section-label">Next best step/g) > 1) failures.push(`${relativePath}: multiple Next best step sections found`);
    if (/<style[\s>]/.test(html) || /style=/.test(html)) failures.push(`${relativePath}: inline style found`);
    if (/[\u0900-\u097F]/.test(html)) failures.push(`${relativePath}: Devanagari text still present`);

    for (const phrase of bannedPhrases) {
      if (html.includes(phrase)) failures.push(`${relativePath}: banned phrase present -> ${phrase}`);
    }

    if (family === "tool-flow" && !html.includes("Guided pre-check")) failures.push(`${relativePath}: tool-flow surface missing`);
    if (family === "troubleshooting" && !html.includes("Likely fixes")) failures.push(`${relativePath}: troubleshooting fixes section missing`);
    if (family === "update-sensitive" && !html.includes('data-qa="last-reviewed"')) failures.push(`${relativePath}: last reviewed marker missing`);
    if (["tool-flow", "guide-process", "troubleshooting", "update-sensitive"].includes(family) && !html.includes('data-qa="official-action-panel"')) {
      failures.push(`${relativePath}: official action panel missing`);
    }

    const links = internalLinks(html);
    for (const href of links) {
      const resolved = resolveInternalLink(filePath, href);
      if (!resolved) failures.push(`${relativePath}: broken internal link -> ${href}`);
    }

    passes.push(relativePath);
  }

  const report = `# QA Report

## Summary
- Checked pages: ${Object.keys(expectedPages).length}
- Passed files scanned: ${passes.length}
- Failure count: ${failures.length}

## Pass Criteria
- lang="en"
- one H1
- hero contract present
- expected template family marker present
- no banned filler phrases
- no inline styling
- no Devanagari text
- internal links resolve
- official-action panel present on official-action families

## Findings
${failures.length ? failures.map((item) => `- ${item}`).join("\n") : "- All checks passed."}
`;

  fs.writeFileSync(reportPath, report, "utf8");

  if (failures.length) {
    console.error(report);
    process.exit(1);
  }

  console.log(report);
}

run();
