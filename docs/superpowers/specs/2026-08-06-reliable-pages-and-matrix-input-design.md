# Reliable Pages and Matrix Input Design

## Goal

Restore reproducible GitHub Pages deployment and reduce unnecessary matrix-grid re-renders while preserving current user behavior.

## Architecture

The project continues to deploy from the generated `dist` directory to the existing `gh-pages` branch. CI and deployment use the same Node.js version, lock file and verification command so local quality gates and production publishing do not drift.

Matrix cells keep temporary text locally while the user types. A validated numeric value is committed to the parent matrix only when editing ends through blur or Enter, reducing parent updates from one per keystroke to one per edit session.

## Components

- `package-lock.json`: synchronized with `package.json`, including Tailwind PostCSS and current React Three Fiber versions.
- `.github/workflows/ci.yml`: installs optional native packages from the lock file and runs typecheck, tests and build.
- `.github/workflows/deploy.yml`: uses Node.js 22 and current Actions, verifies before publishing `dist` to `gh-pages`.
- `components/MatrixInput.tsx`: local edit buffer with explicit commit behavior.
- `components/MatrixInput.test.tsx`: regression tests for deferred updates and Enter-key commit.

## Error handling

Invalid intermediate text remains local during editing. Empty text commits as zero; other non-numeric text leaves the previous matrix value unchanged. Deployment stops before publishing whenever typecheck, tests or build fail.

## Verification

A pull request must pass `npm run verify`. After merging, the Pages workflow must complete successfully and the public site must return the built application from the repository subpath.
