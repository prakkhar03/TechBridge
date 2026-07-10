# Tech Bridge — An AI-Powered Personalized Learning Platform

Tech Bridge is an AI-powered, adaptive learning ecosystem specifically designed for India's startup workforce. It addresses critical skills gaps by providing personalized learning paths, real-time AI support, and gamified learning experiences that directly connect talent to career opportunities.

---

## 🚀 Features

### 1. Student Onboarding & Skill Assessment
* **Multi-Dimensional Quizzes:** Industry-specific competency mapping to pinpoint individual employee skill gaps.
* **Personalized Profiles:** Identifies unique learning styles (visual, auditory, kinesthetic) and aligns them with individual career goals.

### 2. AI-Generated Personalized Learning Paths
* **Dynamic Curriculums:** Generates a custom learning "playlist" adapted dynamically based on learner speed and performance[cite: 1].
* **Multi-Modal Content:** Sequences prerequisites fluidly using video, text, and interactive challenges[cite: 1].

### 3. Interactive Learning Module (Gamification)
* **Engagement Engine:** Features a Duolingo-style streak system, XP points, and milestone achievement badges[cite: 1].
* **Collaborative Challenges:** Includes team-based competitions and progressive unlocking of advanced tiers[cite: 1].

### 4. Real-time Progress Analytics
* **Comprehensive Dashboard:** Offers visual "Google Analytics" styled metrics for learning patterns[cite: 1].
* **Predictive Insights:** Uses skill development heatmaps and predictive modeling to project course completion timeframes[cite: 1].

### 5. AI Agent Sidebar
* **Context-Aware Chat:** 24/7 instant doubt resolution sidebar that acts like a Copilot for your course content[cite: 1].
* **Interactive Help:** Provides instant code debugging assistance and contextual resource recommendations[cite: 1].

### 6. Real-time Freelancing & Internship Tracking
* **Automated Aggregator:** Scrapes and matches real-time job openings from top startup boards[cite: 1].
* **Skill-Based Matching:** Uses cosine similarity matching algorithms to align open opportunities with your completed skills[cite: 1].

---

## 🛠️ Technical Architecture

### Frontend Stack
* **Core Framework:** React 18 with TypeScript, compiled with Vite[cite: 1].
* **UI & Experience:** Tailwind CSS, Framer Motion (animations), Spline (3D interactive rewards), and Lenis (smooth scrolling)[cite: 1].
* **State & Forms:** Zustand (client state), React Query (server state), and React Hook Form[cite: 1].
* **Data Visualization:** Recharts and D3.js[cite: 1].

### Backend Stack
* **Core Framework:** Django 4.2 & Django REST Framework[cite: 1].
* **Database & Caching:** PostgreSQL (primary data) and Redis (caching, sessions, and live state)[cite: 1].
* **AI/ML Components:** TensorFlow/PyTorch (recommendation models), OpenAI API (chatbot processing), and Scikit-learn (predictive analytics)[cite: 1].
* **Real-time & Background Tasks:** Django Channels (WebSockets for live leaderboards) and Celery (background workers)[cite: 1].
* **DevOps:** Containerized using Docker[cite: 1].

---

## 📦 Installation & Setup

### Prerequisites
Ensure you have the following installed on your local environment:
* Python 3.10+
* Node.js (v18+)
* PostgreSQL & Redis