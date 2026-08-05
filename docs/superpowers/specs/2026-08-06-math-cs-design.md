# Inmerson Math-CS Design Specification

**Date:** 2026-08-06  
**Source repository:** `Inmerson/Math-Biotech-Project`  
**Target repository:** `Inmerson/Math-CS`  
**Target visibility:** Public

## 1. Product Definition

Inmerson Math-CS is a separate computer-science mathematics learning application derived from the existing Math-Biotech application. It preserves the working React/Vite/TypeScript/Capacitor foundation and reusable interaction patterns while replacing the biotechnology-specific identity, content, examples, assets, and navigation.

The product supports two PJATK Computer Science mathematics courses:

1. **Math I — Mathematical Analysis** (`Analiza matematyczna`)
2. **Math II — Linear Algebra & Geometry** (`Algebra liniowa i geometria`)

Discrete Mathematics is explicitly outside the first release.

### Product name

**Inmerson Math-CS**

### Tagline

**Interactive Mathematics for Computer Science**

## 2. Goals

- Create a separate public repository named `Inmerson/Math-CS`.
- Copy the source application at a pinned source commit so its working behavior remains reproducible.
- Remove all biotechnology-specific language, examples, routes, icons, illustrations, and metadata from the target repository.
- Organize the application around the two approved PJATK courses.
- Improve the visual design using a calm, premium computational-notebook direction.
- Preserve useful existing capabilities such as quizzes, progress tracking, summaries, exams, and the assistant experience where technically reusable.
- Make every mathematics topic connect naturally to computer-science applications without adding a separate computer-science curriculum.
- Maintain desktop and mobile support.

## 3. Non-Goals

The first release will not include:

- Discrete Mathematics
- Statistical Data Analysis
- Biotechnology or biology content
- A general-purpose computer-science course
- User accounts, cloud synchronization, payments, or social features
- A full computer algebra system
- Arbitrary AI-generated curriculum content
- Unrelated refactoring of the application foundation

## 4. Visual Direction

The approved direction is **Computational Notebook**.

### Design principles

- Academic, focused, and professional rather than game-like
- Dark navy, graphite, warm off-white, and restrained accent colors
- High contrast and strong mathematical typography
- Subtle coordinate grids and geometric patterns
- Clear separation of theory, formulas, visualizations, code connections, and exercises
- Minimal animation used only to explain state changes or mathematical transformations
- No biotechnology imagery and no excessive neon styling

### Responsive layout

**Desktop**

- Persistent left navigation
- Central lesson or lab workspace
- Optional right contextual panel for formulas, hints, and progress

**Mobile**

- Compact header
- Bottom navigation for primary destinations
- Context panels presented as drawers or stacked sections
- Touch-friendly controls and readable mathematical notation

## 5. Information Architecture

Primary navigation:

- Dashboard
- Math I
- Math II
- Math Lab
- Practice
- Exams
- Progress

### Dashboard

The dashboard presents two course cards. Each card shows:

- Course title
- Current completion percentage
- Completed and remaining topics
- Recommended next topic
- Recent quiz result
- Exam-readiness indicator

The dashboard also provides quick access to the last visited lesson, saved formulas, and active practice work.

## 6. Course Scope

### Math I — Mathematical Analysis

Initial topic structure:

1. Functions and graphs
2. Sequences
3. Limits
4. Continuity
5. Derivatives
6. Applications of derivatives
7. Integrals
8. Taylor polynomials and series

Representative computer-science connections include numerical approximation, optimization, rate of change, convergence, error bounds, and introductory algorithm-growth intuition. These connections remain supporting examples rather than additional course modules.

### Math II — Linear Algebra & Geometry

Initial topic structure:

1. Vectors
2. Matrices and matrix operations
3. Systems of linear equations
4. Determinants
5. Matrix inverses
6. Vector spaces and linear independence
7. Linear transformations
8. Eigenvalues and eigenvectors
9. Analytic geometry in two and three dimensions

Representative computer-science connections include computer graphics, coordinate transformations, data representation, machine-learning foundations, geometric computation, and systems modelling.

## 7. Standard Learning Flow

Every topic follows one predictable sequence:

1. **Learn** — concise explanation, definitions, notation, and learning objectives
2. **Visualize** — interactive graph, matrix, vector, or geometric representation
3. **Practice** — guided and independent exercises
4. **CS Connection** — a focused computer-science application
5. **Quiz** — short assessment with immediate feedback

The same content model and page composition are reused across both courses so the learner does not need to relearn the interface.

## 8. Core Components

### 8.1 Course Hub

Purpose: present topics, prerequisites, progress, and recommended next actions for one course.

Depends on:

- Course-content data
- Progress store
- Routing

### 8.2 Lesson Workspace

Purpose: render the standard learning flow for one topic.

Responsibilities:

- Display theory and formulas
- Coordinate visualization state
- Present examples and exercises
- Save completion and quiz results

The workspace consumes structured topic data and does not contain hard-coded course text.

### 8.3 Function Explorer

Purpose: support functions, limits, continuity, derivatives, integrals, and series through interactive plotting.

First-release capabilities:

- Plot approved curriculum functions
- Adjust bounded parameters
- Show points, tangents, intervals, and areas where relevant
- Reset to the lesson-defined state
- Reject invalid or unsupported input cleanly

It is not intended to be an unrestricted symbolic mathematics engine.

### 8.4 Matrix Lab

Purpose: explain and practise matrix operations and systems of equations.

First-release capabilities:

- Matrix addition and multiplication
- Determinant calculation
- Inverse calculation when defined
- Row-operation demonstrations
- Linear-system solving for supported dimensions
- Step-by-step educational output

### 8.5 Vector & Geometry Lab

Purpose: visualize vectors, lines, planes, coordinate systems, and linear transformations.

First-release capabilities:

- Two-dimensional vector manipulation
- Selected three-dimensional static or controlled views
- Dot product and geometric interpretation
- Lines and planes
- Transformation previews

### 8.6 Formula Workspace

Purpose: provide a personal local reference for formulas and short notes.

First-release capabilities:

- Save curriculum formulas
- Add short local notes
- Group entries by course and topic
- Remove saved entries

### 8.7 Practice and Quiz Engine

Purpose: deliver reusable question formats with deterministic grading.

Supported question types:

- Multiple choice
- Numeric answer with configured tolerance
- Ordered solution steps
- Matrix or vector answer for constrained dimensions

Quiz definitions remain in data files and grading logic remains independent from visual components.

### 8.8 Progress Store

Purpose: persist local course progress, lesson completion, saved formulas, and assessment results.

The first release uses the existing local persistence approach unless project inspection identifies a correctness problem. Stored data is namespaced for Math-CS so it cannot collide with Math-Biotech data.

## 9. Content Data Model

Course and topic content must be stored outside React presentation components.

Suggested structure:

```text
Course
- id
- title
- officialTitle
- shortTitle
- description
- order
- topics[]

Topic
- id
- courseId
- title
- description
- prerequisites[]
- learningObjectives[]
- sections[]
- formulas[]
- visualization
- workedExamples[]
- csConnections[]
- practiceQuestions[]
- quiz
- difficulty
- estimatedStudyMinutes
```

Content IDs are stable, lowercase, and domain-neutral. UI state references IDs rather than display text.

## 10. Data Flow

1. The router resolves a course, topic, lab, practice set, or exam.
2. The content layer supplies validated structured data.
3. Presentation components render the data.
4. Interactive components maintain temporary local interaction state.
5. Completed actions are sent to the progress store.
6. The progress store persists namespaced data locally.
7. Dashboard and course hubs derive progress summaries from stored records.

Content data, grading logic, persistence logic, and visual rendering remain separate so each can be tested independently.

## 11. Migration Strategy

### Source preservation

- Record the exact source commit used for the copy.
- Do not alter the source repository’s product identity while constructing Math-CS.
- Preserve source history where practical; otherwise document the pinned source commit clearly in the target repository.

### Target conversion

1. Establish the separate public `Inmerson/Math-CS` repository.
2. Copy the working source application.
3. Update package metadata, application identifiers, titles, favicons, manifests, README content, and deployment settings.
4. Replace biotechnology navigation and domain data.
5. Introduce the two-course content model.
6. Refactor only components directly affected by domain coupling.
7. Apply the approved Computational Notebook design system.
8. Add the approved mathematics labs and assessments incrementally.
9. Scan the target repository for biotechnology terminology and assets.
10. Verify production builds and deployed behavior.

## 12. Error Handling

- Unknown routes display a clear recovery page with links to Dashboard, Math I, and Math II.
- Missing content IDs fail safely and report the affected course/topic identifier during development.
- Invalid function, matrix, vector, or numeric input displays a specific inline explanation and does not corrupt saved progress.
- Singular matrices are identified before inverse operations.
- Numeric grading uses explicit tolerances where exact floating-point equality is inappropriate.
- Local-storage parsing failures fall back to a clean namespaced state without crashing the application.
- Unsupported browser capabilities degrade to a readable static explanation where practical.
- Errors must not reveal biotechnology-era labels or internal implementation details to learners.

## 13. Accessibility

- Full keyboard navigation for primary pages and controls
- Visible focus states
- Semantic headings and landmarks
- Labels for all interactive controls
- Sufficient color contrast
- Mathematical meaning must not depend on color alone
- Text alternatives or descriptions for important visualizations
- Motion-reduction support for non-essential animations
- Usable layouts at common mobile widths and browser zoom levels

## 14. Testing Strategy

### Unit tests

- Course-content validation
- Quiz grading
- Numeric tolerance behavior
- Matrix operations
- Progress calculations
- Persistence serialization and recovery

### Component tests

- Course cards and topic navigation
- Lesson-state transitions
- Correct rendering of validation errors
- Quiz feedback and result persistence
- Responsive navigation behavior where practical

### Integration tests

- Complete a lesson and observe dashboard progress
- Complete a quiz and observe course statistics
- Save and remove a formula
- Resume from persisted state
- Navigate between both courses and their labs

### End-to-end smoke tests

- Application loads on the deployed public URL
- Dashboard, both course hubs, labs, practice, exams, and progress pages open
- No broken routes or missing production assets
- Mobile navigation remains functional

### Migration checks

- Repository-wide scan for biotechnology terminology and biological assets
- Package and application identifiers reference Math-CS
- Build and lint commands succeed
- Existing reusable behavior remains functional unless intentionally replaced

## 15. Repository and Deployment Requirements

- Target repository name: `Math-CS`
- Target owner: `Inmerson`
- Visibility: public
- Default branch: `main`
- README describes Math-CS only
- Deployment configuration targets the new repository path and URL
- Source-repository references appear only in migration or attribution documentation
- No credentials, generated secrets, or private user data are committed

## 16. Acceptance Criteria

The first release is accepted when:

1. `Inmerson/Math-CS` exists as a public standalone repository.
2. The application builds successfully from a clean checkout.
3. The visible product identity is Inmerson Math-CS.
4. Dashboard, Math I, Math II, Math Lab, Practice, Exams, and Progress are navigable.
5. Both approved courses have structured topic hubs and representative usable lessons.
6. Function Explorer, Matrix Lab, and Vector & Geometry Lab provide the approved first-release behaviors.
7. Quiz grading and local progress persistence work correctly.
8. Desktop and mobile layouts are usable.
9. Automated tests and smoke checks pass.
10. A repository-wide review finds no learner-facing biotechnology content or assets.

## 17. Implementation Boundaries

Implementation should favour adaptation over a rewrite. Existing components are reused when they have domain-neutral responsibilities and acceptable structure. Domain-coupled components may be split into focused units, but unrelated architectural modernization is deferred.

Each implementation phase must keep the application buildable and testable. Content conversion, visual redesign, interactive labs, and final migration cleanup should be delivered as distinct, reviewable groups of changes.
