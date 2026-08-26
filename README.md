# LearnPath AI — AI-Powered Personalized Learning Path Recommender

> **Hackathon Common Frontend Foundation (MERN + AI/ML Architecture)**

Welcome to **LearnPath AI**. This repository provides the shared, conflict-free frontend skeleton and architectural guidelines for our 4-developer hackathon engineering team.

---

## 1. Team Development Structure & Module Ownership

The frontend is organized so each developer works independently in their designated folders:

| Team Member | Assigned Modules | Feature Pages | Feature Components Directory |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Dashboard + My Profile** | `DashboardPage.jsx`<br/>`ProfilePage.jsx` | `src/components/dashboard/`<br/>`src/components/profile/` |
| **Member 2** | **Learning Path + Skill Gaps** | `LearningPathPage.jsx`<br/>`SkillGapsPage.jsx` | `src/components/learningPath/`<br/>`src/components/skillGaps/` |
| **Member 3** | **Courses + Assessments** | `CoursesPage.jsx`<br/>`AssessmentsPage.jsx` | `src/components/courses/`<br/>`src/components/assessments/` |
| **Member 4** | **AI Assistant + Progress** | `AIAssistantPage.jsx`<br/>`ProgressPage.jsx` | `src/components/aiAssistant/`<br/>`src/components/progress/` |

---

## 2. Git Branching Strategy & Workflow

```text
main
│
├── frontend
│   │
│   ├── feature/member-1   (Dashboard & Profile)
│   ├── feature/member-2   (Learning Path & Skill Gaps)
│   ├── feature/member-3   (Courses & Assessments)
│   └── feature/member-4   (AI Assistant & Progress)
│
├── backend                (Node.js / Express / MongoDB)
└── ai-ml                  (Recommendations / NLP / Gemini API)
```

### Git Collaboration Rules:
1. **Never commit directly to `main` or `frontend`.**
2. Branch out from `frontend` into your feature branch (e.g. `git checkout -b feature/member-1`).
3. Only work within your assigned pages and component directories.
4. Open a Pull Request (PR) against `frontend` when completing a milestone.
5. Always pull the latest `frontend` before creating PRs.

---

## 3. Core Shared Files (Protected Files Rule)

The following files are **CORE SHARED FILES**. Do **NOT** modify these files casually or add module-specific logic into them:

```text
src/
├── App.jsx                   # Route definitions only
├── main.jsx                  # React DOM mount
├── layouts/MainLayout.jsx    # Common Navbar + Sidebar shell
├── components/common/*       # Shared UI component library
├── services/api.js           # Central Axios HTTP client
├── context/AuthContext.jsx   # Shared Auth state
├── utils/mockData.js         # Isolated demo mock schemas
├── index.css                 # Design tokens & typography
└── tailwind.config.js        # Tailwind theme config
```

> **Rule:** If a shared component needs an update, discuss it with the team first, make minimal backwards-compatible additions, and notify the team.

---

## 4. Shared Design System & Tokens

All 4 developers **must use the same design tokens** to ensure the platform feels like ONE cohesive product:

### Color Palette:
- **Primary:** `#6366F1` (`primary-500` / Indigo)
- **Secondary:** `#8B5CF6` (`secondary-500` / Purple)
- **Background:** `#0F172A` (`background` / Slate 900)
- **Card Surface:** `#111827` (`surface-card` / Gray 900)
- **Text:** `#F8FAFC` (`text` / Slate 50)
- **Muted Text:** `#94A3B8` (`text-muted` / Slate 400)
- **Status Success:** `#22C55E` (`status-success`)
- **Status Warning:** `#F59E0B` (`status-warning`)
- **Status Danger:** `#EF4444` (`status-danger`)

### Typography:
- Primary Font: **`Inter`**
- Monospace Font: **`JetBrains Mono`**

---

## 5. Common Component Library Usage

Do **NOT** reinvent or duplicate custom buttons or cards in your feature folders. Use the shared library:

### 1. Button (`src/components/common/Button.jsx`)
```jsx
import Button from '../common/Button';
import { ArrowRight } from 'lucide-react';

<Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
  Continue Learning
</Button>
// Supported variants: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
// Supported sizes: 'sm' | 'md' | 'lg'
```

### 2. Card (`src/components/common/Card.jsx`)
```jsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../common/Card';

<Card variant="interactive">
  <CardHeader>
    <CardTitle>Skill Matrix</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Feature content */}
  </CardContent>
</Card>
// Supported variants: 'default' | 'interactive' | 'glow' | 'flat'
```

### 3. Badge (`src/components/common/Badge.jsx`)
```jsx
import Badge from '../common/Badge';

<Badge variant="success" size="sm" dot>
  Completed
</Badge>
// Supported variants: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
```

### 4. PageHeader (`src/components/common/PageHeader.jsx`)
```jsx
import PageHeader from '../common/PageHeader';

<PageHeader
  title="Learning Path"
  description="Personalized step-by-step roadmap"
  badge="Member 2"
  action={<Button variant="primary" size="sm">Regenerate</Button>}
/>
```

### 5. Modal (`src/components/common/Modal.jsx`)
```jsx
import Modal from '../common/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Module Assessment"
  description="Test your knowledge before advancing."
>
  {/* Content */}
</Modal>
```

---

## 6. Project Directory Structure

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/             # Shared reusable primitives
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── dashboard/          # Member 1 components
│   │   ├── profile/            # Member 1 components
│   │   ├── learningPath/       # Member 2 components
│   │   ├── skillGaps/          # Member 2 components
│   │   ├── courses/            # Member 3 components
│   │   ├── assessments/        # Member 3 components
│   │   ├── aiAssistant/        # Member 4 components
│   │   └── progress/           # Member 4 components
│   ├── pages/
│   │   ├── LandingPage.jsx     # Route: /
│   │   ├── LoginPage.jsx       # Route: /login
│   │   ├── SignupPage.jsx      # Route: /signup
│   │   ├── DashboardPage.jsx   # Route: /dashboard     (Member 1)
│   │   ├── ProfilePage.jsx     # Route: /profile       (Member 1)
│   │   ├── LearningPathPage.jsx# Route: /learning-path (Member 2)
│   │   ├── SkillGapsPage.jsx   # Route: /skill-gaps    (Member 2)
│   │   ├── CoursesPage.jsx     # Route: /courses       (Member 3)
│   │   ├── AssessmentsPage.jsx # Route: /assessments   (Member 3)
│   │   ├── AIAssistantPage.jsx # Route: /ai-assistant  (Member 4)
│   │   └── ProgressPage.jsx    # Route: /progress      (Member 4)
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── utils/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.example
```

---

## 7. Getting Started Locally

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
