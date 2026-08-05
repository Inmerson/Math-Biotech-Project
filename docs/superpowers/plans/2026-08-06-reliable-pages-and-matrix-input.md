# Reliable Pages and Matrix Input Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore reproducible GitHub Pages deployment and ship the tested MatrixInput render optimization.

**Architecture:** Reuse the synchronized dependency lock and tested MatrixInput change from the reviewed optimization branch. Standardize CI and Pages on Node.js 22, install optional native dependencies, and require the shared `npm run verify` gate before deployment.

**Tech Stack:** React 19, TypeScript, Vite 6, Vitest 4, npm lockfile v3, GitHub Actions, GitHub Pages.

## Global Constraints

- Preserve the existing `gh-pages` publishing model.
- Use Node.js 22 in CI and deployment.
- Use `npm ci --include=optional` for reproducible native dependency installation.
- Do not publish when typecheck, tests or production build fail.
- Keep matrix editing behavior compatible with blur and Enter workflows.

---

### Task 1: Synchronize dependencies

**Files:**
- Modify: `package-lock.json`

- [ ] Replace the stale lock file with the reviewed synchronized lock from `copilot/review-and-merge-prs-6-7`.
- [ ] Run `npm ci --include=optional` and confirm installation succeeds.
- [ ] Run `npm run verify` and record the result in CI.

### Task 2: Add MatrixInput regression coverage and implementation

**Files:**
- Modify: `components/MatrixInput.tsx`
- Create: `components/MatrixInput.test.tsx`

- [ ] Add tests proving parent `onChange` is deferred until blur and committed once.
- [ ] Add test coverage for Enter-key completion.
- [ ] Replace per-keystroke parent updates with a local edit buffer and explicit commit.
- [ ] Run `npm test -- components/MatrixInput.test.tsx`.

### Task 3: Repair CI and Pages deployment

**Files:**
- Modify: `.github/workflows/ci.yml`
- Modify: `.github/workflows/deploy.yml`

- [ ] Standardize both workflows on Node.js 22 and current checkout/setup-node actions.
- [ ] Install with `npm ci --include=optional`.
- [ ] Run `npm run verify` before publishing.
- [ ] Publish `dist` with `peaceiris/actions-gh-pages@v4` using explicit `contents: write` permission.
- [ ] Confirm the pull request CI succeeds.
- [ ] Merge and confirm the main-branch Pages workflow succeeds.

### Task 4: Production verification

**Files:**
- No source changes expected.

- [ ] Open the GitHub Pages URL.
- [ ] Confirm the dashboard renders from `/Math-Biotech-Project/`.
- [ ] Confirm matrix inputs accept decimal typing and commit on blur/Enter.
- [ ] Confirm the latest workflow run is successful.
