# LearnPath AI — AI-Powered Personalized Learning Path Recommender

> An intelligent, role-driven learning acceleration platform built on the MERN stack, deterministic multi-factor AI/ML recommendation scoring, and Google Gemini LLM conversational co-piloting.

---

## 1. Project Overview

**LearnPath AI** is an intelligent, end-to-end learning acceleration platform designed to eliminate the fragmentation, rigid one-size-fits-all curricula, and absence of real-time pedagogical mentorship in modern technical education.

By evaluating a learner's current verified competencies against curated computer science and software engineering benchmarks, LearnPath AI constructs dynamic, mathematically calibrated learning roadmaps. The platform continuously tracks learner telemetry, dynamically recalibrates milestones following assessment outcomes, delivers targeted course recommendations, and provides 24/7 personalized guidance through an integrated Google Gemini AI mentor.

---

## 2. Problem Statement

Modern technical self-learning platforms exhibit fundamental limitations:

- **Static, One-Size-Fits-All Curricula**: Learners from diverse backgrounds are pushed through identical linear courses regardless of existing proficiencies or target career requirements.
- **Hidden Skill Deficits**: Learners lack clear, quantitative visibility into the exact technical gaps separating them from industry readiness.
- **Rigid Progression**: Traditional course roadmaps do not adapt when a learner demonstrates rapid mastery or struggles on prerequisite concepts.
- **Absence of Real-Time Contextual Mentorship**: When facing complex architectural or algorithmic hurdles, learners lack instant, pedagogical guidance tailored to their active study milestones.

---

## 3. Solution

LearnPath AI transforms skill development into an adaptive, closed-loop engineering feedback cycle:

- **Target-Role Calibration**: Learners select from 30+ specialized computer science and IT career objectives (e.g., *Full Stack Developer*, *Data Scientist*, *Cloud Engineer*, *Machine Learning Engineer*).
- **Algorithmic Skill Gap Analysis**: A deterministic multi-factor gap engine evaluates capabilities against standardized industry competency taxonomies.
- **Dynamic Curriculum Synthesis**: Automated multi-phase roadmap generation with verifiable milestone deliverables and estimated timelines.
- **Multi-Factor Course Recommendation**: Deterministic 6-parameter content scoring ranking resources by gap severity, prerequisite readiness, and difficulty.
- **Diagnostic Assessments & Adaptive Quizzes**: Interactive testing environments with question and option randomization, automated scoring, and real-time skill level calibration.
- **Context-Aware Gemini AI Mentor**: Multi-turn conversational co-pilot with live learner telemetry injection and structured action execution (e.g., dynamic quiz synthesis).

---

## 4. Key Features

### 🎯 Role-Based Personalized Learning
- **30+ Supported Technical Objectives**: Deep competency profiles spanning Frontend, Backend, Full Stack, Data Science, AI/ML, Cloud, DevOps, and Cybersecurity.
- **Weighted Readiness Scoring**: Transparent mathematical evaluation calculating career readiness $[0 - 100\%]$ without arbitrary static baselines.
- **Isolated User State**: Strict multi-user state isolation ensuring clean 0-state onboards (0 XP, 0 streak, unassessed baseline).

### 🗺️ Dynamic Curriculum & Learning Path Generation
- **Multi-Phase Milestone Roadmaps**: Structured sequences grouping foundational, intermediate, and advanced engineering phases.
- **Adaptive Re-calibration**: Dynamically adjusts milestone timelines and curriculum recommendations based on assessment performance.
- **AI Adaptation History Log**: Transparent ledger recording chronological automated path adaptations and pedagogical rationales.

### 📊 Skill Gap Analysis & Recharts Skill Radar
- **Multi-Axis Radar Visualization**: Interactive radar charts comparing learner proficiency against target industry thresholds.
- **Priority Deficit Breakdown**: Classifies gaps into *High*, *Medium*, and *Low* priority categories with targeted improvement recommendations.

### 📚 Course Catalog & AI Fast-Track Synthesizer
- **Curated Multi-Module Library**: Filterable courses covering duration, difficulty, skills covered, and direct enrollment tracking.
- **On-Demand AI Synthesizer**: Generates complete multi-lesson custom curricula for arbitrary technical topics on demand.

### 📝 Diagnostic Assessments & Dynamic Quizzes
- **Interactive Assessment Runner**: Timed evaluations featuring Fisher-Yates question and option randomization.
- **Instant Skill & XP Calibration**: Automatically updates user skill proficiencies, awards verifiable XP, and updates streak counters.

### 🤖 AI Assistant & Floating Gemini Mentor Drawer
- **Global Drawer & Dedicated Chat Page**: Accessible across all pages via a floating mentor drawer or a full-screen chat workspace.
- **3-Tier Model Cascading**: High-resilience API architecture cascading through `gemini-3.5-flash-lite` → `gemini-3.5-flash` → `gemini-3.6-flash`.
- **Structured Action Triggers**: Automatically extracts pedagogical intents (e.g., `GENERATE_QUIZ`) to launch interactive diagnostic modals directly in chat.

### 👤 Resume Intelligence & Profile Management
- **Automated Resume Parsing**: Server-side text extraction from uploaded PDF and DOCX documents using `pdf-parse` and `mammoth`.
- **Normalization & Deduplication**: Canonicalizes skill variations (e.g., `react` → `React.js`, `k8s` → `Kubernetes`) and upgrades duplicate skills to the highest verified proficiency level.

### 📈 Learning Progress & Learner Telemetry
- **7-Day Study Cadence Histogram**: Tracks daily focus hours and activity trends.
- **Domain Competency Breakdown**: Quantitative progress metrics across frontend, backend, databases, cloud, and core engineering fundamentals.

### 🎨 Dual-Theme Design System
- **Obsidian Dark Mode**: Deep `#0B0D0F` background, `#16191E` card surfaces, `#FF6B5F` coral accents, and ivory typography.
- **Soft Ivory Light Mode**: Cohesive `#FAF7F2` background, pure white card surfaces, subtle `rgba(0,0,0,0.08)` borders, and high-contrast dark typography adhering to WCAG AAA standards.

---

## 5. Personalization / AI Learning Pipeline

LearnPath AI executes a continuous calibration loop that adapts to every learner action:

```text
   ┌─────────────────────────────────────────────────────────────┐
   │                     1. User Profile                         │
   │        Current Proficiencies • Education • Experience       │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                  2. Target Career Role                      │
   │      Career Objective Selected (e.g., MERN Stack Developer) │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │             3. Skill Normalization / Taxonomy               │
   │       Canonical Alias Mapping & Standardized Categories     │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                  4. Skill Gap Analysis                      │
   │     Benchmark Comparison • Deficit & Priority Calculation   │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │             5. Readiness / Competency Scoring               │
   │         Deterministic Weighted Readiness Formula            │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │         6. Course & Curriculum Recommendation               │
   │          6-Factor Mathematical Multi-Weight Scoring         │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                  7. Assessment / Quiz                       │
   │     Randomized Diagnostic Tests • Timed Question Runners    │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                 8. Learning Telemetry                       │
   │        Score Evaluation • XP Rewards • Streak Increment     │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │             9. Continuous Personalization                   │
   │    Roadmap Adaptation • AI Mentor Context Synchronization   │
   └─────────────────────────────────────────────────────────────┘
```

---

## 6. AI/ML Architecture

The platform's analytical intelligence resides in `ai-ml/`, utilizing deterministic multi-factor mathematical scoring and canonical taxonomies:

```text
ai-ml/
├── recommendation/
│   ├── engine/
│   │   ├── contentScorer.js        # 6-Factor mathematical course scoring
│   │   ├── rankingEngine.js        # Deduplication, priority ranking, and rationale generator
│   │   └── recommendationEngine.js # Orchestration layer connecting catalog and gap reports
│   └── data/
│       ├── coursesData.js          # Course metadata, skills tags, and durations
│       └── roleCourseMapping.js    # Role-to-course relationship definitions
├── skill-gap/
│   ├── analyzer/
│   │   ├── gapCalculator.js        # Gap computation and alias mapping
│   │   ├── readinessScorer.js      # Weighted overall career readiness calculation
│   │   ├── suggestionEngine.js     # Actionable guidance synthesizer
│   │   └── skillGapAnalyzer.js     # Benchmark evaluator and defensive validator
│   └── data/
│       ├── skillBenchmarks.js      # Comprehensive role competency thresholds
│       └── skillsTaxonomy.js       # Canonical skill normalization dictionary
└── assistant/
    ├── chat/chatEngine.js          # Conversational state and dialogue processor
    ├── context/contextManager.js   # Telemetry, roadmap, and profile aggregator
    ├── prompts/                    # Specialized prompt templates
    └── service/assistantService.js # LLM orchestration and structured action parser
```

### 1. Mathematical Readiness Scoring Formula
Overall career readiness is calculated deterministically across all required role competencies without arbitrary baselines:

$$\text{Overall Readiness (\%)} = \left( \frac{\sum_{i=1}^{n} \min(\text{currentLevel}_i, \text{targetLevel}_i) \times \text{importance}_i}{\sum_{i=1}^{n} \text{targetLevel}_i \times \text{importance}_i} \right) \times 100$$

- **Bounded Values**: Individual skill levels are clamped within $[0, 100]$.
- **Alias Resolution**: Automatically normalizes variants (e.g., `postgres` → `PostgreSQL`, `k8s` → `Kubernetes`, `aws` → `AWS Cloud`).
- **Zero-State Integrity**: An unassessed or empty profile computes to an exact $0\%$ readiness tier.

### 2. Multi-Factor Course Scoring Model
Candidate learning resources are evaluated against learner deficits across 6 verified weighted dimensions:

| Dimension | Weight | Mathematical Evaluation Basis |
| :--- | :---: | :--- |
| **Skill Gap Severity** | **35%** | Measures direct coverage of high-deficit and high-priority unmastered competencies. |
| **Role Alignment** | **25%** | Verifies alignment with the learner's designated target engineering objective. |
| **Prerequisite Readiness** | **15%** | Ensures prerequisite fundamentals are fulfilled before advanced content is recommended. |
| **Difficulty Calibration** | **10%** | Balances current learner proficiency against course difficulty tier. |
| **Learner Preference** | **10%** | Matches preferred learning modality (e.g., Hands-on Projects, Documentation, Video). |
| **Content Quality** | **5%** | Factors in community rating and curriculum completeness. |

---

## 7. Gemini AI Mentor Architecture

The conversational tutor integrates Google Gemini models via a robust backend proxy service to deliver real-time guidance synchronized with live learner telemetry:

```text
   ┌─────────────────────────────────────────────────────────────┐
   │                   Learner Message / Query                   │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │           Context Aggregator (mentorService.js)             │
   │  Active Target Role • Verified Skills • Active Phase • Logs │
   │                Recent 6-Turn Conversation History           │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │         3-Tier Model Cascading Gateway (llmService.js)      │
   │   1. gemini-3.5-flash-lite  (Sub-second response target)    │
   │   2. gemini-3.5-flash       (Standard production tier)      │
   │   3. gemini-3.6-flash       (Complex reasoning fallback)    │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                  Response Post-Processing                   │
   │     Thought Tag Stripping • Structured Action Extraction     │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                      Frontend Chat UI                       │
   │   Markdown Response Bubble + Interactive Action Chips/Modal │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │         Action Execution (e.g., Dynamic Quiz Modal)         │
   └─────────────────────────────────────────────────────────────┘
```

### Architectural Safeguards:
- **Thought Tag Stripping**: Regular expressions cleanly remove internal reasoning artifacts (`<thought>...</thought>`) prior to rendering.
- **Structured Action Extraction**: Detects intent patterns (e.g., `GENERATE_QUIZ`, skill target, question count) and returns actionable payloads to trigger interactive client modals.
- **Stateless Proxy**: Frontend communicates exclusively with authenticated backend endpoints; API keys are never exposed to the client.

---

## 8. System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                             CLIENT TIER                                │
│                     React 18 • Vite • Tailwind CSS                     │
│                                                                        │
│   ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐   │
│   │    Dashboard      │  │   Learning Path   │  │    Skill Gaps    │   │
│   │ Overview & Stats  │  │ Multi-Phase Tree  │  │ Radar & Analysis │   │
│   └───────────────────┘  └───────────────────┘  └──────────────────┘   │
│   ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐   │
│   │     Courses       │  │    Assessments    │  │   AI Assistant   │   │
│   │ Catalog & Synth   │  │ Interactive Tests │  │ Gemini Co-Pilot  │   │
│   └───────────────────┘  └───────────────────┘  └──────────────────┘   │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Context Providers: AuthContext • ThemeContext • LearningPath   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ JSON / REST APIs (Axios)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             SERVER TIER                                │
│                        Node.js • Express.js                            │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ API Routes: /auth • /learning-path • /skills • /ai • /quiz     │   │
│   └────────────────────────────────────────────────────────────────┘   │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Middleware: JWT Authentication • Multer File Upload • Error    │   │
│   └────────────────────────────────────────────────────────────────┘   │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Services: adaptivePathService • mentorService • llmService     │   │
│   └────────────────────────────────────────────────────────────────┘   │
└───────────────┬────────────────────────────────────────┬───────────────┘
                │                                        │
                ▼                                        ▼
┌──────────────────────────────┐        ┌────────────────────────────────┐
│        DATABASE TIER         │        │           AI/ML TIER           │
│      MongoDB / Mongoose      │        │  Multi-Factor Content Scorer   │
│                              │        │  Readiness & Gap Analyzer      │
│ • Users & Profiles           │        │  Skill Benchmark Taxonomies    │
│ • Learning Paths & Phases    │        │  Google Gemini 3.5/3.6 Gateway │
│ • Quizzes & Submissions      │        └────────────────────────────────┘
│ • Telemetry & History        │
└──────────────────────────────┘
```

---

## 9. Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18.3.1** | Reactive component-driven user interface |
| **Build Tooling** | **Vite 5.4.9** | Optimized development server and ES module bundler |
| **Styling & Theme** | **Tailwind CSS 3.4.14** | Utility-first design tokens supporting dual Light & Dark themes |
| **Routing** | **React Router DOM 6.27.0** | Declarative client-side routing with route guards |
| **Data Visualization** | **Recharts 2.13.0** | Responsive Skill Radar charts and progress telemetry visualizations |
| **Icons & Micro-FX** | **Lucide React & Canvas Confetti** | Consistent iconography and milestone celebration effects |
| **Backend Runtime** | **Node.js & Express 4.21.0** | REST API gateway, controllers, and middleware execution |
| **Database & ODM** | **MongoDB & Mongoose 8.7.0** | Document database for schemas, users, roadmaps, and progress |
| **Authentication** | **JSON Web Tokens (JWT) & bcryptjs** | Stateless token authentication and salted password hashing |
| **Document Extraction** | **pdf-parse & mammoth** | Server-side text extraction from uploaded PDF and DOCX resumes |
| **Large Language Model** | **Google Gemini API** | Multi-turn conversational AI mentor and curriculum synthesizer |
| **Test Automation** | **Jest 30.5.0 & Supertest 7.2.2** | Automated unit testing, API integration testing, and test suites |

---

## 10. Project Structure

```text
LearnPath-AI/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── aiAssistant/       # Full-screen conversational chat interface
│   │   │   ├── assessments/       # Assessment runner modal and question reviewer
│   │   │   ├── common/            # Shared UI (Navbar, Sidebar, Modal, Card, Button, Badge)
│   │   │   ├── courses/           # Course details modal and syllabus view
│   │   │   ├── dashboard/         # Metrics overview and quick navigation widgets
│   │   │   ├── mentor/            # Global floating AI Mentor Drawer
│   │   │   ├── profile/           # Profile overview and edit modal
│   │   │   ├── progress/          # Analytics and 7-day study histogram
│   │   │   ├── quiz/              # AI diagnostic quiz runner modal
│   │   │   └── skillGaps/         # Skill Radar chart and gap breakdown view
│   │   ├── context/               # AuthContext, ThemeContext, LearningPathContext
│   │   ├── data/                  # Career objectives list and course catalog
│   │   ├── layouts/               # MainLayout and AuthLayout shells
│   │   ├── pages/                 # 8 canonical feature pages
│   │   ├── services/              # Axios API client and service endpoints
│   │   ├── App.jsx                # Router configuration and protected route guards
│   │   ├── index.css              # Design tokens and theme contrast rules
│   │   └── main.jsx               # Client application entry point
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/               # Express request handlers
│   ├── middleware/                # JWT auth guard, error handler, multer upload
│   ├── models/                    # Mongoose database models
│   ├── routes/                    # REST API endpoint routes
│   ├── seed/                      # Database seeders and benchmark datasets
│   ├── services/
│   │   ├── adaptive/              # Adaptive path generation and progression logic
│   │   ├── ai/                    # Gemini LLM gateway and mentor service
│   │   ├── recommendation/        # Skill gap and course recommendation bridge
│   │   └── statisticsService.js   # User telemetry and XP aggregation
│   ├── tests/                     # 8 Jest test suites (111 unit tests)
│   ├── utils/                     # Resume parser and text sanitizers
│   ├── package.json
│   └── server.js                  # Backend application server entry
├── ai-ml/
│   ├── assistant/                 # Conversational context and prompt templates
│   ├── recommendation/            # Multi-factor content scorer and ranking engine
│   ├── roadmap/                   # Dynamic curriculum generator and skill taxonomy
│   ├── skill-gap/                 # Deterministic gap calculator and readiness scorer
│   └── test_runner.js             # AI/ML integration test runner (47 tests)
├── verify_all_flows.js            # End-to-end integration test verification script
├── package.json                   # Root workspace scripts
└── README.md                      # Master project documentation
```

---

## 11. API Overview

All protected endpoints require authentication via JWT Bearer Token or HTTP session cookie.

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registers a new learner account with verified 0-state baseline initialization. |
| `POST` | `/api/auth/login` | Authenticates user credentials and returns JWT session token. |
| `POST` | `/api/auth/logout` | Clears authentication session. |
| `GET` | `/api/auth/me` | Retrieves authenticated learner profile and session state. |

### 👤 Profile & Resume (`/api/profile`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/profile` | Retrieves current learner profile details and career goals. |
| `PUT` | `/api/profile` | Updates profile preferences, target role, and skill proficiencies. |
| `POST` | `/api/profile/resume` | Uploads and parses PDF/DOCX resume file. |
| `PUT` | `/api/profile/resume-data` | Merges, normalizes, and deduplicates extracted resume skills. |

### 🗺️ Adaptive Learning Path (`/api/learning-path`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/learning-path` | Fetches the active multi-phase roadmap for the learner. |
| `POST` | `/api/learning-path/generate` | Synthesizes a new customized curriculum for a designated target role. |
| `POST` | `/api/learning-path/adapt` | Recalibrates active phases based on diagnostic test outcomes. |

### 🎯 Skill Gap Analysis (`/api/skills`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/skills/gap-analysis` | Computes role readiness percentage, deficit list, and radar data. |
| `POST` | `/api/skills/gap-analysis` | Persists evaluated competency adjustments. |

### 📚 Courses & Recommendations (`/api/courses` & `/api/recommendations`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/courses` | Retrieves available course catalog with module syllabus data. |
| `POST` | `/api/recommendations/generate` | Generates multi-factor ranked course recommendations. |

### 📝 Diagnostic Quizzes & Assessments (`/api/quiz`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/quiz/generate` | Dynamically constructs a skill assessment quiz. |
| `POST` | `/api/quiz/submit` | Scores assessment submissions, awards XP, and updates skill proficiencies. |
| `GET` | `/api/quiz/history` | Retrieves historical assessment attempts and performance breakdown. |

### 🤖 AI Mentor & Guidance (`/api/ai`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/ai/chat` | Multi-turn conversational endpoint with live learner context and action triggers. |
| `GET` | `/api/ai/conversation` | Retrieves persistent dialogue history for the authenticated user. |

---

## 12. Personalization Details

The learner's selected **Target Career Role** directly governs the entire platform experience:

1. **Curriculum Generation**: Roadmaps are structured with role-specific milestone phases (e.g., *Frontend Foundations* vs. *Statistical Data Pipelines*).
2. **Skill Benchmarks**: Competency thresholds adapt to industry standards for the active role.
3. **Course Scoring**: Recommendations prioritize the exact skills required by the selected target.
4. **AI Mentor Context**: Conversational guidance is grounded in the active career objective and roadmap phase.

---

## 13. Assessment & Quiz System

The diagnostic testing system provides calibrated evaluation:

- **Question Pool Randomization**: Questions are dynamically sampled and shuffled using the Fisher-Yates algorithm.
- **Option Randomization**: Multiple-choice options are shuffled on every attempt to prevent memorization patterns.
- **Real-Time Timed Runner**: Active countdown timer with visual progress indicators.
- **Immediate Answer Explanations**: Submissions return full question explanations, correctness status, and earned XP.
- **Automated Skill Calibration**: Passing scores immediately upgrade verified competency levels on the Skill Radar.

---

## 14. Resume / Profile Processing

- **Multi-Format Extraction**: Ingests PDF and DOCX files server-side using `pdf-parse` and `mammoth`.
- **Taxonomy Normalization**: Maps diverse aliases to standard skill names (e.g., `reactjs`, `react.js` → `React.js`).
- **Deduplication & Proficiency Merging**: Existing user skills are merged with resume skills, retaining the highest verified level.

---

## 15. Security & Configuration

- **Environment-Based Configuration**: Secrets, API credentials, and database connection strings are managed strictly via environment variables.
- **Stateless JWT Authentication**: Passwords hashed using `bcryptjs` with salt rounds; sessions guarded by signed JWT tokens.
- **Zero Client Secret Exposure**: All LLM and database interactions are proxied through authenticated backend services.

---

## 16. Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance or active connection URI

### 1. Clone the Repository
```bash
git clone https://github.com/akshatchandel-1/LearnPath-AI.git
cd LearnPath-AI
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Return to root directory
cd ..
```

### 3. Configure Local Environment
Configure the required local/private application configuration according to the project environment specifications.

### 4. Seed Initial Catalog Data (Optional)
```bash
cd server
npm run seed
cd ..
```

### 5. Launch Application Services
```bash
# Start backend server (Port 5000)
npm run server

# Start frontend development server (Port 5173) in a second terminal
npm run client
```

Access the web application at **`http://localhost:5173`**.

---

## 17. Testing & Quality Assurance

The codebase is thoroughly validated across all architectural tiers:

```text
============================================================
🏁 COMPREHENSIVE TEST EXECUTION SUMMARY
============================================================
✅ AI/ML Integration Suite:     47 / 47 Passed   (100%)
✅ Server Jest Test Suites:    111 / 111 Passed  (100%)
✅ End-to-End Flow Assertions:  33 / 33 Passed   (100%)
✅ Client Production Build:     2,462 Modules Transformed (0 Errors)
📊 TOTAL VERIFIED ASSERTIONS:  191 / 191 Passed  (100%)
============================================================
```

### Run Test Suites:
```bash
# 1. AI/ML Module Tests (47 assertions)
cd ai-ml && node test_runner.js

# 2. Server Jest Unit & Integration Tests (111 assertions across 8 suites)
cd ../server && npm test

# 3. Comprehensive End-to-End Flow Verification (33 assertions)
cd .. && node verify_all_flows.js

# 4. Client Production Build Validation
cd client && npm run build
```

---

## 18. Current Project Status

This repository represents the **Final Integrated Hackathon Version** of LearnPath AI. All 8 core feature modules, the deterministic AI/ML scoring layer, the Google Gemini conversational mentor, and the dual-theme design system are fully integrated and verified.

---

## 19. Future Scope

- **In-Browser Code Sandboxes**: WebAssembly/container-based execution environments for live coding challenges.
- **Collaborative Study Cohorts**: Automated matching of peer learners with complementary skill profiles.
- **Fine-Tuned Domain Adapters**: Specialized small-language models trained exclusively on technical interview rubrics and engineering syllabi.

---

## 20. Engineering Team & Module Architecture

Developed for the **Hackathon Competition**:

- **Member 1**: Dashboard Telemetry & Learner Profile Intelligence
- **Member 2**: Adaptive Learning Path Generator & Skill Gap Radar
- **Member 3**: Curated Course Catalog & Diagnostic Assessment Runner
- **Member 4**: Gemini AI Conversational Co-Pilot & Progress Analytics

---

## 21. License

This project is licensed under the **MIT License** — see the `package.json` configuration for details.
