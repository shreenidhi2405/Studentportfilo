# CampusFolio — Smart Student Academic & Portfolio Management System

**CampusFolio** is a full-featured, university-grade academic management and professional portfolio web application. It integrates student academic records, continuous internal evaluations, attendance shortage warnings, printable university grade cards, and a shareable public portfolio builder with role-based access for **Students**, **Faculty**, and **Administrators**.

---

## 🚀 Key Highlights & Features

### 1. Landing Page
- **Hero Section**: *"Your Academic Journey, All in One Place"* with interactive UI and animated preview.
- **Instant Demo Switcher Bar**: One-click demo buttons to test Student, Faculty, and Admin dashboards immediately.
- **Accreditation & Metrics**: Live statistics on student body, placement rates, faculty, and security assurance.
- **Theme Support**: Seamless Dark/Light mode toggle with smooth CSS variable transitions.

### 2. Student Dashboard
- **Personalized Profile**: Photo, name, USN, department, semester, class rank, and active enrollment badge.
- **Academic KPI Metrics**: Overall CGPA (9.38), current SGPA (9.45), attendance percentage, and earned credits.
- **Interactive Analytics**: Interactive SGPA trend line chart across semesters using Chart.js.
- **Upcoming Schedule & Circulars**: Examination timetable, submission deadlines, and campus announcements.

### 3. Academic Marks Management & PDF Grade Cards
- **Continuous Evaluation Matrix**: Breakdown of Internal Assessments (IA-1, IA-2, IA-3), Assignment marks, Lab evaluations, and Semester End Exams (SEE).
- **Official University Grade Card**: Print/PDF modal formatted with institution crest, student metadata, marks table, credits, letter grades, grading key, digital verification seal, and Controller of Examinations signature block.
- **Publishing Workflow**: Only published marks are visible to students. Draft marks remain in faculty consoles until approved.

### 4. Attendance Management & 75% Shortage Warnings
- **Real-Time Monitoring**: Subject-wise and overall attendance percentage tracking.
- **Configurable Shortage Alert**: Automatic warning banner whenever attendance drops below the 75% university threshold (e.g. demonstrated in student Rahul Verma's account).
- **Attendance Recovery Calculator**: Calculates how many consecutive classes a student must attend to restore eligibility.

### 5. Student Portfolio Builder & Public Showcase
- **Customizable Portfolio**: Edit bio, professional tagline, technical skills, projects, certifications, and social links (GitHub, LinkedIn, LeetCode, Twitter).
- **Shareable Public Recruiter URL**: Dedicated standalone page (`portfolio.html?usn=1MS21CS084`).
- **Strict Privacy Guarantee**: Public portfolios strictly showcase candidate-approved projects, skills, and certifications while never exposing private marks, internal evaluations, attendance metrics, or personal phone numbers.

### 6. Faculty Dashboard
- **Assigned Courses**: Course cards for assigned theory and laboratory subjects.
- **Continuous Grading Console**: Enter and update IA1, IA2, assignments, and SEE marks with auto-calculated total and grade points.
- **Bulk Publishing**: One-click *"Publish All Marks"* to release grades to student portals.
- **Class Attendance Logger**: Record conducted and attended hours with live percentage calculation.
- **Announcements Broadcast**: Publish department circulars and examination notices.

### 7. Administrator Dashboard
- **University Governance**: System-wide statistics for students, faculty, departments, and courses.
- **Student Directory**: Add new students, edit metadata, activate/deactivate accounts, and view portfolios.
- **Faculty Directory**: Manage faculty profiles, designations, and assigned subjects.
- **Academic Settings**: Configure institution name, accreditation, academic year, and attendance warning threshold.
- **Audit & Security Logs**: Comprehensive, immutable activity log tracking marks publishing, attendance updates, and policy changes with timestamps and user roles.

---

## 👥 Pre-Configured Demonstration Accounts

You can switch between any of these users instantly using the topbar dropdown or login modal:

| Role | Name | ID / USN | Department | Special Highlight |
|---|---|---|---|---|
| **Student (Primary)** | Shreenidhi N | `1MS21CS084` | CSE (Sem 6) | CGPA 9.38, Distinction, Top Portfolio |
| **Student (Alert)** | Rahul Verma | `1MS21CS110` | CSE (Sem 6) | **Attendance Shortage Alert (<75%)** |
| **Student** | Priya Sharma | `1MS21IS045` | ISE (Sem 6) | CGPA 9.15, UI/UX & Data Analytics |
| **Student** | Aarav Patel | `1MS21CS002` | CSE (Sem 6) | CGPA 8.92, DevOps & Cloud |
| **Student** | Ananya Iyer | `1MS21AI015` | AI & DS (Sem 4) | CGPA 9.60, University Rank 1 |
| **Faculty** | Dr. Arvind Sharma | `FAC001` | CSE | HOD, Full-Stack & Cloud Computing |
| **Faculty** | Dr. Meenakshi Sundaram | `FAC002` | AI & DS | Associate Professor, Machine Learning |
| **Faculty** | Prof. Rajesh Kulkarni | `FAC003` | ECE | Assistant Professor, Networks & IoT |
| **Administrator** | Dr. H. V. Ramesh | `ADM001` | Academic Dean | University Registrar & Governance |

---

## 💻 How to Run Locally

### Option 1: Direct File Opening
Double-click `index.html` in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
You can run any local web server:

```powershell
# Using Python
python -m http.server 3000

# OR using Node.js
npx serve -l 3000
```

Then visit:
- Main Platform: **`http://localhost:3000/index.html`**
- Public Portfolio Showcase: **`http://localhost:3000/portfolio.html?usn=1MS21CS084`**

---

## 📁 File Structure

```
├── index.html              # Main application (Landing page, Student, Faculty & Admin Dashboards)
├── portfolio.html          # Public recruiter-ready portfolio page
├── css/
│   └── style.css           # Navy/Cyan design system, dark/light modes, glassmorphism, print CSS
├── js/
│   ├── data.js             # Realistic seed data (10 students, 3 faculty, 1 admin, marks, attendance)
│   ├── store.js            # State management layer with LocalStorage persistence & audit logging
│   ├── app.js              # UI controller, routing, charts, modal handlers, marks card generator
│   └── public-portfolio.js # Standalone script for public portfolio rendering
└── README.md               # Documentation and usage guide
```
