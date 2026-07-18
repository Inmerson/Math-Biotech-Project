# Math Biotech

A mobile-first learning application for mathematical workflows used in biotechnology studies.

The project combines a Capacitor-based mobile experience with a REST API for mathematical computation, matrix operations, and exam-performance tracking.

## Project goals

Math Biotech is designed to make quantitative biotechnology topics easier to explore by bringing calculations, structured explanations, and progress data into one application.

## Features

- Mobile application built with Capacitor for Android and iOS
- Matrix addition and multiplication
- Determinants, inverses, and eigenvalue calculations
- Exam-performance tracking and statistics
- REST API for frontend and external integrations
- Local-data and privacy-oriented application design
- AI-assisted analytical workflows

## Architecture

```text
Mobile application
       │
       ▼
Frontend interface
       │
       ▼
REST API server
       │
       ├── Mathematical operations
       └── Exam tracking and statistics
```

Detailed backend documentation is available in [`server/README.md`](server/README.md).

## Run the API locally

### Requirements

- Node.js
- npm

### Setup

```bash
git clone https://github.com/Inmerson/Math-Biotech-Project.git
cd Math-Biotech-Project/server
npm install
npm run dev
```

The development API is available by default at:

```text
http://localhost:5000
```

## Mobile installation

Android builds, when published, can be installed from the repository's Releases section.

Before installing an APK outside an application store, review the release notes and verify that it was published from this repository.

## Development status

The application is under active development. Interfaces, endpoints, and installation steps may change as the project matures.

## Roadmap

- Expand biotechnology-oriented mathematical examples
- Improve step-by-step explanations
- Add clearer API request and response examples
- Strengthen automated testing and continuous integration
- Publish screenshots and a documented demonstration workflow

## Responsible development

Mathematical and AI-generated outputs should be independently checked before they are used in academic, laboratory, clinical, or professional decisions.

## Author

Developed by [Halil Ibrahim Ozturk](https://github.com/Inmerson).

---

© 2026 Inmerson. All rights reserved.
