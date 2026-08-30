# LearnPath AI — AI-Powered Personalized Learning Platform

> **Intelligent, role-driven learning path recommendation and skill acceleration platform powered by the MERN Stack, deterministic multi-factor AI/ML scoring, and Google Gemini LLM conversational co-piloting.**

[![Build Status](https://img.shields.io/badge/Build-Passing-34D399?style=for-the-badge&logo=vite&logoColor=white)](https://github.com)
[![Test Suite](https://img.shields.io/badge/Tests-191%20Passed%20%2F%20100%25-38BDF8?style=for-the-badge&logo=jest&logoColor=white)](https://github.com)
[![Architecture](https://img.shields.io/badge/Architecture-MERN%20%2B%20AI%2FML%20%2B%20Gemini-FF6B5F?style=for-the-badge&logo=react&logoColor=white)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-FBBF24?style=for-the-badge)](https://github.com)

---

## 🚀 Overview

**LearnPath AI** is an intelligent, end-to-end learning acceleration platform engineered to eliminate the fragmentation, generic static curricula, and lack of real-time guidance prevalent in traditional online education.

By bridging the gap between a learner's current verified competencies and the rigorous demands of modern tech industry roles, LearnPath AI constructs dynamic, mathematically calibrated learning journeys. The platform continuously monitors learner telemetry, dynamically adjusts roadmaps based on assessment outcomes, delivers targeted course recommendations, and provides 24/7 personalized mentorship via an integrated Google Gemini AI engine.

---

## 🎯 Problem Statement

Traditional online learning platforms suffer from critical structural limitations:

1. **One-Size-Fits-All Curricula**: Learners of diverse backgrounds are forced through identical linear courses regardless of their existing skills or specific career targets.
2. **Invisible Competency Gaps**: Learners lack clear, quantitative visibility into exactly what technical skills they are missing for their desired career roles.
3. **Static Learning Paths**: Course sequences do not adapt when a learner struggles with specific topics or excels ahead of schedule.
4. **Lack of Instant Pedagogical Guidance**: When learners encounter challenging concepts or code issues, they lack real-time, context-aware mentorship tailored to their active curriculum.

---

## 💡 Our Solution

LearnPath AI transforms skill development into a closed-loop, adaptive engineering feedback cycle:

- **Target-Role Calibration**: Learners choose from 30+ specialized computer science and IT career objectives (e.g., *Full Stack Developer*, *Data Scientist*, *Cloud Engineer*, *Machine Learning Engineer*).
- **Algorithmic Skill Gap Analysis**: A deterministic multi-factor gap engine evaluates learner capabilities against curated industry skill benchmarks.
- **Dynamic Curriculum Synthesis**: Automated multi-phase roadmap generation with verifiable milestone deliverables.
- **Intelligent Resource Ranking**: Multi-factor content scoring algorithm ranking courses based on gap severity, prerequisite readiness, and difficulty.
- **Interactive Checkpoints & Diagnostics**: Randomized diagnostic assessments with instant skill calibrations and XP rewards.
- **Google Gemini AI Co-Pilot**: Multi-turn conversational tutor equipped with live user context, telemetry awareness, and structured quiz generation triggers.

---

## ✨ Key Features

### 🎯 Role-Driven Personalization
- **30+ Supported Tech Objectives**: Deep competency taxonomies spanning Frontend, Backend, Full Stack, Data Science, AI/ML, Cloud, DevOps, and Cybersecurity.
- **Weighted Readiness Scoring**: Transparent mathematical evaluation calculating exact career readiness percentage $[0 - 100%]$ without arbitrary static baselines.
- **Clean-Slate Zero-State Onboarding**: Isolated new-learner experience initializing with verified 0 XP, 0 streak, and unassessed baseline state.

### 🤖 Multi-Factor AI/ML Recommendation Engine
- **Multi-Factor Content Scoring**: Evaluates candidate courses across 6 weighted dimensions: Skill Gap Severity (35%), Role Alignment (25%), Prerequisite Readiness (15%), Difficulty Fit (10%), Style Preference (10%), and Content Quality (5%).
- **Transparent Explainability**: Every recommendation synthesizes an actionable rationale explaining why a specific course was prioritized.
- **AI Fast-Track Synthesizer**: On-demand curriculum generation synthesizing custom multi-lesson modules for arbitrary technologies on the fly.

### 🧠 Gemini AI Mentor & Conversational Co-Pilot
- **3-Tier Model Cascading**: High-resilience API architecture cascading through `gemini-3.5-flash-lite` → `gemini-3.5-flash` → `gemini-3.6-flash` (<1s latency).
- **Deep Learner Context Injection**: Prompts automatically receive the user's active target role, verified skill proficiencies, active roadmap phase, and recent 6-turn dialogue history.
- **Structured Action Extraction**: Detects pedagogical intents (e.g., `GENERATE_QUIZ`) and surfaces actionable interactive widgets directly in the chat interface.

### 📊 Skill Gap Engine & Skill Radar
- **Recharts Interactive Skill Radar**: Visualizes multi-axis competency benchmarks comparing learner proficiencies directly against industry role standards.
- **Priority-Classified Deficits**: Automatically classifies gaps into *High*, *Medium*, and *Low* priority categories with targeted improvement recommendations.

### 📚 Curated Courses & Interactive Assessments
- **Structured Multi-Module Catalog**: Curated tracks featuring lesson breakdowns, duration estimates, official API documentation, and video crash courses.
- **Diagnostic Assessment Runner**: Interactive testing environment featuring Fisher-Yates question & option shuffling, real-time countdown timers, detailed explanations, and automatic skill updates upon completion.

### 👤 Resume Intelligence & Profile Synchronization
- **Automated Resume Parsing**: Extracts skills, experience level, education, and career objectives from uploaded PDF and DOCX files.
- **Skill Normalization & Deduplication**: Canonicalizes skill aliases (e.g., `react` → `React.js`, `k8s` → `Kubernetes`) and intelligently upgrades duplicate entries to their highest verified level.

### 🎨 Unified Dual-Theme Design System
- **Obsidian Dark Mode**: Deep `#0B0D0F` surfaces with glowing Coral `#FF6B5F` accents and ivory typography.
- **Soft Ivory Light Mode**: Cohesive `#FAF7F2` layout with crisp white cards, subtle `rgba(0,0,0,0.08)` borders, and high-contrast typography adhering to WCAG AAA standards.

---

## 🧭 Personalization Pipeline

LearnPath AI operates on an active feedback loop that continuously recalibrates as the learner progresses:

```text
   ┌─────────────────────────────────────────────────────────────┐
   │                     1. Learner Profile                      │
   │      Target Objective • Verified Skills • Learning Style    │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                 2. Role Benchmark Taxonomy                  │
   │      Required Core Competencies • Proficiency Thresholds    │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                 3. Skill Gap & Radar Engine                 │
   │      Deficit Calculation • Priority Tagging • Readiness %   │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │            4. Multi-Factor Course Recommendation            │
   │     Gap Matching (35%) • Role Alignment (25%) • Prereqs     │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │               5. Adaptive Multi-Phase Roadmap               │
   │        Milestones • Curriculum Phases • Learning Tasks      │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │              6. Checkpoints & Diagnostic Quizzes            │
   │       Timed Assessments • Randomized Options • Feedback     │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │          7. Telemetry Calibration & Recalibration           │
   │   Mastery Updates • XP Rewards • AI Mentor Context Update   │
   └─────────────────────────────────────────────────────────────┘
```

---

## 🤖 AI & ML Architecture

The platform's analytical intelligence is divided into two distinct, cooperative subsystems: **Algorithmic Multi-Factor Machine Learning** and **LLM Conversational Intelligence**.

```text
ai-ml/
├── recommendation/
│   ├── engine/
│   │   ├── contentScorer.js        # Multi-factor mathematical course scoring
│   │   ├── rankingEngine.js        # Deduplication, priority ranking, and explanation generator
│   │   └── recommendationEngine.js # Orchestration layer connecting catalog and gap reports
│   └── data/
│       ├── coursesData.js          # Canonical course metadata and skill tags
│       └── roleCourseMapping.js    # Role-to-course relationship definitions
├── skill-gap/
│   ├── analyzer/
│   │   ├── gapCalculator.js        # Normalized gap math and alias mapping
│   │   ├── readinessScorer.js      # Weighted overall career readiness calculation
│   │   ├── suggestionEngine.js     # Actionable guidance synthesizer
│   │   └── skillGapAnalyzer.js     # Benchmark evaluator and defensive input validator
│   └── data/
│       ├── skillBenchmarks.js      # Comprehensive role competency thresholds
│       └── skillsTaxonomy.js       # Canonical skill normalization dictionary
└── assistant/
    ├── chat/chatEngine.js          # Conversational state and dialogue processor
    ├── context/contextManager.js   # Telemetry, roadmap, and profile aggregator
    ├── prompts/                    # Specialized prompt templates
    └── service/assistantService.js # LLM orchestration and action parser
```

### 1. Mathematical Readiness Scoring Formula
Overall career readiness is calculated deterministically across all required role competencies without arbitrary baselines:

$$\text{Overall Readiness (\%)} = \left( \frac{\sum_{i=1}^{n} \min(\text{currentLevel}_i, \text{targetLevel}_i) \times \text{importance}_i}{\sum_{i=1}^{n} \text{targetLevel}_i \times \text{importance}_i} \right) \times 100$$

- **Bounded Clamping**: Individual skill levels are strictly bounded in $[0, 100]$.
- **Alias Resolution**: Automatically canonicalizes heterogeneous inputs (e.g., `postgres` → `PostgreSQL`, `k8s` → `Kubernetes`, `aws` → `AWS Cloud`).
- **Zero-State Integrity**: An unassessed or empty learner profile calculates to an honest $0\%$ readiness tier.

### 2. Multi-Factor Content Scorer
Candidate courses are evaluated against active learner skill gaps across 6 weighted parameters:

| Factor | Weight | Evaluation Principle |
| :--- | :---: | :--- |
| **Skill Gap Severity** | **35%** | Measures direct coverage of high-deficit and high-priority unmastered competencies. |
| **Role Alignment** | **25%** | Verifies alignment with the learner's designated target engineering objective. |
| **Prerequisite Readiness** | **15%** | Ensures prerequisite fundamentals are fulfilled before advanced content is recommended. |
| **Difficulty Calibration** | **10%** | Balances current learner proficiency against course difficulty tier. |
| **Learner Preference** | **10%** | Matches preferred learning modality (e.g., Hands-on Projects, Documentation, Video). |
| **Content Quality** | **5%** | Factors in community rating and curriculum completeness. |

---

## 🧠 Gemini AI Mentor Architecture

The conversational tutor integrates Google Gemini models to deliver real-time guidance directly synchronized with the learner's live telemetry.

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
   └─────────────────────────────────────────────────────────────┘
```

### Key Capabilities:
- **Thought Tag Sanitation**: Automatically filters internal reasoning tags (`<thought>...</thought>`) to ensure clean responses.
- **Multi-Turn Contextual Awareness**: Injects previous conversation turns, allowing natural follow-up queries (e.g., *"Why is this concept important for my active phase?"*).
- **Dynamic Quiz Intent Detection**: Detects evaluation requests (e.g., *"Test me on React with 3 questions"*) and triggers structured interactive quiz modals.

---

## 🏗️ System Architecture

LearnPath AI is structured as a decoupled 3-tier architecture with clean separation of concerns:

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

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18.3.1** | Component-driven user interface and reactive state management |
| **Build & Tooling** | **Vite 5.4.9** | Optimized development server and production bundler |
| **Styling & Design** | **Tailwind CSS 3.4.14** | Utility-first design system supporting dual Light & Dark themes |
| **Routing** | **React Router DOM 6.27.0** | Client-side declarative routing and protected routes |
| **Data Visualization** | **Recharts 2.13.0** | Interactive Skill Radar charts and analytics telemetry visualizations |
| **Icons & UI FX** | **Lucide React & Canvas Confetti** | Iconography and celebratory milestone gamification |
| **Backend Environment** | **Node.js & Express 4.21.0** | REST API gateway, service orchestration, and middleware pipeline |
| **Database & ODM** | **MongoDB & Mongoose 8.7.0** | Schema-backed document persistence and relationship modeling |
| **Authentication** | **JSON Web Tokens (JWT) & bcryptjs** | Secure stateless authentication and salted password hashing |
| **Document Processing** | **pdf-parse & mammoth** | Server-side PDF and DOCX text extraction for resume parsing |
| **Large Language Model** | **Google Gemini API** | Multi-turn conversational AI reasoning and curriculum guidance |
| **Test Automation** | **Jest 30.5.0 & Supertest 7.2.2** | Automated unit testing, integration suites, and API validation |

---

## 📂 Project Structure

```text
LearnPath-AI/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── aiAssistant/       # Full-screen conversational AI chat interface
│   │   │   ├── assessments/       # Assessment runner modal and question reviewer
│   │   │   ├── common/            # Shared UI (Navbar, Sidebar, Modal, Card, Button, Badge)
│   │   │   ├── courses/           # Course details modal and syllabus view
│   │   │   ├── dashboard/         # Core metrics and overview widgets
│   │   │   ├── mentor/            # Global floating AI Mentor Drawer
│   │   │   ├── profile/           # Profile overview and edit modal
│   │   │   ├── progress/          # Analytics and 7-day study histogram
│   │   │   ├── quiz/              # AI diagnostic quiz modal
│   │   │   └── skillGaps/         # Skill Radar chart and gap breakdown view
│   │   ├── context/               # AuthContext, ThemeContext, LearningPathContext
│   │   ├── data/                  # Career objectives and course catalog
│   │   ├── layouts/               # MainLayout and AuthLayout shells
│   │   ├── pages/                 # 8 canonical feature pages
│   │   ├── services/              # Axios API client and backend connectors
│   │   ├── App.jsx                # Unified router configuration
│   │   ├── index.css              # Design tokens and theme contrast rules
│   │   └── main.jsx               # Client application entry point
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/               # Express request handlers
│   ├── middleware/                # JWT auth guard, error handler, multer upload
│   ├── models/                    # Mongoose database schemas
│   ├── routes/                    # REST API endpoint definitions
│   ├── seed/                      # Database seeders and mock taxonomies
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

## 🔌 API Overview

All protected endpoints require authentication via JWT Bearer Token or HTTP session cookie.

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registers a new learner account with 0-state baseline initialization. |
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

## ⚙️ Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local instance or remote connection

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/LearnPath-AI.git
cd LearnPath-AI
```

### 2. Install Dependencies
```bash
# Install root workspace dependencies
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

### 5. Launch Development Servers
```bash
# Option A: Run backend and frontend concurrently from root
npm run server  # Terminal 1: Starts backend on http://localhost:5000
npm run client  # Terminal 2: Starts frontend on http://localhost:5173

# Option B: Run individual services
cd server && npm run dev   # Node.js backend
cd client && npm run dev   # Vite frontend dev server
```

Access the application in your browser at **`http://localhost:5173`**.

---

## 🧪 Testing & Validation

The platform includes an extensive multi-tier test automation suite:

```text
============================================================
🏁 COMPREHENSIVE TEST EXECUTION SUMMARY
============================================================
✅ AI/ML Integration Suite:     47 / 47 Passed   (100%)
✅ Server Jest Test Suites:    111 / 111 Passed  (100%)
✅ End-to-End Flow Assertions:  33 / 33 Passed   (100%)
✅ Client Production Build:     2,462 Modules Transformed (0 Errors)
📊 TOTAL ASSERTIONS:           191 / 191 Passed  (100%)
============================================================
```

### 1. Run AI/ML Integration Test Suite
Executes unit tests for skill gap calculations, alias normalization, and multi-factor recommendation ranking:
```bash
cd ai-ml
node test_runner.js
```

### 2. Run Backend Unit & Integration Tests
Runs all 8 Jest test suites covering authentication, learning paths, quizzes, profiles, and analytics:
```bash
cd server
npm test
```

### 3. Run End-to-End Integration Verification
Executes the live E2E verification script validating the complete user journey:
```bash
node verify_all_flows.js
```

### 4. Run Frontend Production Build Validation
Validates JSX syntax, styling tokens, and module bundling:
```bash
cd client
npm run build
```

---

## 🔮 Future Scope

- **Real-Time Code Execution Sandboxes**: Embedded WebAssembly/Docker runner for live in-browser coding exercises.
- **Collaborative Peer Study Cohorts**: Automated matching of learners with complementary skill profiles.
- **Dynamic Video Chunk Synthesizer**: AI-assisted video summarization extracting precise timestamped chapters mapped to milestone objectives.
- **Fine-Tuned Domain Adapters**: Specialized small-language models trained exclusively on technical computer science curricula and interview rubrics.

---

## 👥 Engineering Team & Architecture

Built with precision for the **Hackathon Competition**:

- **Member 1**: Dashboard Telemetry & Learner Profile Intelligence
- **Member 2**: Adaptive Learning Path Generator & Skill Gap Radar
- **Member 3**: Curated Course Catalog & Diagnostic Assessment Runner
- **Member 4**: Gemini AI Conversational Co-Pilot & Progress Analytics

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
