/**
 * CampusFolio - Main Application Controller
 * Handles UI interactions, rendering, role management, charts, and modal events.
 */

class CampusApp {
  constructor() {
    this.store = window.store;
    this.currentTab = "overview";
    this.chartInstances = {};
    this.init();
  }

  init() {
    this.applyTheme(this.store.getTheme());
    this.bindGlobalEvents();
    this.renderRoleSwitcher();
    this.render();

    // Re-render when store updates
    this.store.subscribe(() => {
      this.render();
    });
  }

  // --- Theme Management ---
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icons = document.querySelectorAll(".theme-icon");
    icons.forEach(icon => {
      icon.className = theme === "dark" ? "fas fa-sun theme-icon" : "fas fa-moon theme-icon";
    });
  }

  toggleTheme() {
    const next = this.store.toggleTheme();
    this.applyTheme(next);
    this.showToast(`Switched to ${next} mode`, "info");
  }

  // --- Toast Notifications ---
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    let icon = "fa-info-circle";
    if (type === "success") icon = "fa-check-circle";
    if (type === "error") icon = "fa-exclamation-triangle";

    toast.innerHTML = `
      <i class="fas ${icon}" style="color: ${type === 'success' ? '#10b981' : type === 'error' ? '#f43f5e' : '#06b6d4'}"></i>
      <div style="flex: 1; font-size: 0.9rem;">${message}</div>
      <button onclick="this.parentElement.remove()" style="color: var(--text-muted);">&times;</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- View Switching (Landing vs App) ---
  showLanding() {
    document.getElementById("landing-view").style.display = "block";
    document.getElementById("app-view").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  showApp() {
    document.getElementById("landing-view").style.display = "none";
    document.getElementById("app-view").style.display = "block";
    this.renderAppShell();
    this.switchTab(this.currentTab || "overview");
  }

  // --- Tab Navigation ---
  switchTab(tabId) {
    this.currentTab = tabId;

    // Update sidebar active links
    document.querySelectorAll(".sidebar-link").forEach(link => {
      if (link.dataset.tab === tabId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update breadcrumbs
    const bcCurrent = document.getElementById("breadcrumb-current");
    if (bcCurrent) {
      bcCurrent.textContent = tabId.charAt(0).toUpperCase() + tabId.slice(1).replace("-", " ");
    }

    // Hide all tab panes, show active
    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.remove("active");
    });
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) {
      targetPane.classList.add("active");
    }

    // Specific tab renders
    const session = this.store.getSession();
    if (!session) return;

    if (session.role === "STUDENT") {
      if (tabId === "overview") this.renderStudentOverview();
      if (tabId === "marks") this.renderStudentMarks();
      if (tabId === "attendance") this.renderStudentAttendance();
      if (tabId === "portfolio") this.renderStudentPortfolioBuilder();
      if (tabId === "calendar") this.renderAcademicCalendar();
      if (tabId === "placements") this.renderPlacementPrep();
    } else if (session.role === "FACULTY") {
      if (tabId === "faculty-classes") this.renderFacultyClasses();
      if (tabId === "faculty-marks") this.renderFacultyMarksManager();
      if (tabId === "faculty-attendance") this.renderFacultyAttendanceManager();
      if (tabId === "faculty-announcements") this.renderAnnouncementsTab();
    } else if (session.role === "ADMIN") {
      if (tabId === "admin-overview") this.renderAdminOverview();
      if (tabId === "admin-students") this.renderAdminStudents();
      if (tabId === "admin-faculty") this.renderAdminFaculty();
      if (tabId === "admin-settings") this.renderAdminSettings();
      if (tabId === "admin-audit") this.renderAdminAuditLogs();
    }

    // Close mobile drawer if open
    document.querySelector(".app-sidebar")?.classList.remove("mobile-open");
  }

  // --- Session Switching ---
  switchUser(role, userId) {
    this.store.setSession(role, userId);
    this.showToast(`Signed in as ${this.store.getSession().name} (${role})`, "success");
    this.currentTab = role === "STUDENT" ? "overview" : role === "FACULTY" ? "faculty-classes" : "admin-overview";
    this.showApp();
  }

  // --- Render Dynamic App Shell based on Role ---
  renderAppShell() {
    const session = this.store.getSession();
    if (!session) return;

    const user = this.store.getCurrentUser();
    const roleBadge = document.getElementById("sidebar-role-badge");
    const navContainer = document.getElementById("sidebar-dynamic-nav");

    if (roleBadge && user) {
      const avatarUrl = user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80";
      roleBadge.innerHTML = `
        <img src="${avatarUrl}" alt="${user.name}" class="role-avatar-circle">
        <div class="role-info-text">
          <div class="role-user-name" title="${user.name}">${user.name}</div>
          <div class="role-tag">${session.role} &bull; ${user.usn || user.dept || 'Dean'}</div>
        </div>
      `;
    }

    if (navContainer) {
      if (session.role === "STUDENT") {
        navContainer.innerHTML = `
          <div class="nav-section-title">Academic Portal</div>
          <a href="#" class="sidebar-link active" data-tab="overview">
            <i class="fas fa-th-large"></i><span>Dashboard</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="marks">
            <i class="fas fa-file-invoice"></i><span>Marks & Results</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="attendance">
            <i class="fas fa-user-check"></i><span>Attendance Log</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="portfolio">
            <i class="fas fa-briefcase"></i><span>Portfolio Builder</span>
          </a>
          <div class="nav-section-title">Campus Resources</div>
          <a href="#" class="sidebar-link" data-tab="calendar">
            <i class="fas fa-calendar-alt"></i><span>Exams & Calendar</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="placements">
            <i class="fas fa-graduation-cap"></i><span>Placement Prep</span>
          </a>
        `;
      } else if (session.role === "FACULTY") {
        navContainer.innerHTML = `
          <div class="nav-section-title">Faculty Console</div>
          <a href="#" class="sidebar-link active" data-tab="faculty-classes">
            <i class="fas fa-chalkboard-teacher"></i><span>Assigned Courses</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="faculty-marks">
            <i class="fas fa-edit"></i><span>Grading & Marks</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="faculty-attendance">
            <i class="fas fa-clipboard-check"></i><span>Record Attendance</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="faculty-announcements">
            <i class="fas fa-bullhorn"></i><span>Announcements</span>
          </a>
        `;
      } else if (session.role === "ADMIN") {
        navContainer.innerHTML = `
          <div class="nav-section-title">System Administration</div>
          <a href="#" class="sidebar-link active" data-tab="admin-overview">
            <i class="fas fa-tachometer-alt"></i><span>Admin Overview</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="admin-students">
            <i class="fas fa-user-graduate"></i><span>Student Directory</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="admin-faculty">
            <i class="fas fa-user-tie"></i><span>Faculty Directory</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="admin-settings">
            <i class="fas fa-sliders-h"></i><span>Academic Settings</span>
          </a>
          <a href="#" class="sidebar-link" data-tab="admin-audit">
            <i class="fas fa-shield-alt"></i><span>Audit & Security Logs</span>
          </a>
        `;
      }

      // Re-bind sidebar tab clicks
      navContainer.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.switchTab(link.dataset.tab);
        });
      });
    }

    this.renderNotificationCount();
  }

  renderRoleSwitcher() {
    const selector = document.getElementById("quick-role-select");
    if (!selector) return;

    const students = this.store.getStudents();
    const faculty = this.store.getFaculty();
    const admin = this.store.state.admin;
    const session = this.store.getSession();

    let html = `<optgroup label="Students">`;
    students.forEach(s => {
      const selected = session?.role === "STUDENT" && session?.userId === s.id ? "selected" : "";
      html += `<option value="STUDENT:${s.id}" ${selected}>Student: ${s.name} (${s.usn})</option>`;
    });
    html += `</optgroup><optgroup label="Faculty Members">`;
    faculty.forEach(f => {
      const selected = session?.role === "FACULTY" && session?.userId === f.id ? "selected" : "";
      html += `<option value="FACULTY:${f.id}" ${selected}>Faculty: ${f.name} (${f.dept})</option>`;
    });
    html += `</optgroup><optgroup label="Administration">`;
    const adminSel = session?.role === "ADMIN" ? "selected" : "";
    html += `<option value="ADMIN:${admin.id}" ${adminSel}>Admin: ${admin.name} (Dean)</option>`;
    html += `</optgroup>`;

    selector.innerHTML = html;
  }

  renderNotificationCount() {
    const list = this.store.getNotifications();
    const unread = list.filter(n => !n.read).length;
    const badge = document.getElementById("notif-badge");
    if (badge) {
      badge.style.display = unread > 0 ? "block" : "none";
    }
  }

  // --- Student Dashboard Renderers ---
  renderStudentOverview() {
    const student = this.store.getCurrentUser();
    if (!student) return;

    const overallAtt = this.store.getOverallAttendance(student.id);
    const marks = this.store.getMarks(student.id, false);
    const announcements = this.store.getAnnouncements().slice(0, 3);
    const events = this.store.state.calendarEvents.slice(0, 3);

    // Warning Banner if attendance < 75%
    const warningArea = document.getElementById("student-warning-area");
    if (warningArea) {
      if (overallAtt.hasShortage) {
        warningArea.innerHTML = `
          <div class="alert-banner">
            <div class="alert-content">
              <i class="fas fa-exclamation-triangle alert-icon"></i>
              <div>
                <strong>Attendance Warning Alert: ${overallAtt.percentage}%</strong>
                <div style="font-size: 0.85rem; opacity: 0.9;">
                  Your overall attendance has fallen below the mandatory ${overallAtt.threshold}% university threshold. You risk being barred from Semester End Examinations. Contact your subject faculties immediately.
                </div>
              </div>
            </div>
            <button class="btn btn-sm btn-danger" onclick="window.app.switchTab('attendance')">Review Attendance</button>
          </div>
        `;
      } else {
        warningArea.innerHTML = "";
      }
    }

    // Student Header Card
    const headerEl = document.getElementById("student-overview-header");
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="glass-panel" style="padding: 24px; margin-bottom: 28px; position: relative; overflow: hidden;">
          <div style="position: absolute; right: -20px; top: -20px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%); border-radius: 50%;"></div>
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; position: relative; z-index: 2;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <img src="${student.avatar}" alt="${student.name}" style="width: 76px; height: 76px; border-radius: 50%; border: 3px solid var(--accent-cyan); object-fit: cover;">
              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                  <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800;">${student.name}</h2>
                  <span class="badge badge-cyan">${student.usn}</span>
                  <span class="badge badge-emerald">Class Rank #${student.rank}</span>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.95rem;">
                  ${student.departmentName} &bull; ${student.sem}th Semester (Sec ${student.section}) &bull; Class of 2025
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <a href="portfolio.html?usn=${student.usn}" target="_blank" class="btn btn-cyan">
                <i class="fas fa-external-link-alt"></i> View Public Portfolio
              </a>
              <button class="btn btn-secondary" onclick="window.app.switchTab('portfolio')">
                <i class="fas fa-user-edit"></i> Edit Portfolio
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // KPI Metrics
    const kpiEl = document.getElementById("student-overview-kpis");
    if (kpiEl) {
      kpiEl.innerHTML = `
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-top">
              <span class="kpi-label">Cumulative GPA</span>
              <div class="kpi-icon" style="background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan);"><i class="fas fa-trophy"></i></div>
            </div>
            <div class="kpi-val">${student.cgpa.toFixed(2)}</div>
            <div class="kpi-subtext">Scale: 10.0 &bull; Top 5% in Dept</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-top">
              <span class="kpi-label">Current SGPA (Sem 6)</span>
              <div class="kpi-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald);"><i class="fas fa-chart-line"></i></div>
            </div>
            <div class="kpi-val">${student.sgpa.toFixed(2)}</div>
            <div class="kpi-subtext"><span style="color: var(--accent-emerald);">&uarr; +0.10</span> from last semester</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-top">
              <span class="kpi-label">Total Attendance</span>
              <div class="kpi-icon" style="background: ${overallAtt.hasShortage ? 'rgba(244,63,94,0.15)' : 'rgba(59,130,246,0.15)'}; color: ${overallAtt.hasShortage ? 'var(--accent-rose)' : 'var(--accent-blue)'};">
                <i class="fas fa-clock"></i>
              </div>
            </div>
            <div class="kpi-val" style="color: ${overallAtt.hasShortage ? 'var(--accent-rose)' : 'inherit'};">${overallAtt.percentage}%</div>
            <div class="progress-track">
              <div class="progress-fill ${overallAtt.hasShortage ? 'rose' : 'cyan'}" style="width: ${Math.min(100, overallAtt.percentage)}%"></div>
            </div>
            <div class="kpi-subtext" style="margin-top: 8px;">${overallAtt.attendedClasses} / ${overallAtt.totalClasses} Classes Attended</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-top">
              <span class="kpi-label">Earned Credits</span>
              <div class="kpi-icon" style="background: rgba(168, 85, 247, 0.15); color: var(--accent-purple);"><i class="fas fa-certificate"></i></div>
            </div>
            <div class="kpi-val">${student.totalCredits}</div>
            <div class="kpi-subtext">Target: 160 Credits for Degree</div>
          </div>
        </div>
      `;
    }

    // Chart & Deadlines Row
    this.renderPerformanceCharts(student);

    // Announcements & Events List
    const annContainer = document.getElementById("student-announcements-list");
    if (annContainer) {
      annContainer.innerHTML = announcements.map(a => `
        <div style="padding: 14px 0; border-bottom: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span class="badge badge-cyan" style="font-size: 0.7rem;">${a.category}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${a.date}</span>
          </div>
          <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 4px;">${a.title}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${a.content.substring(0, 110)}...</div>
        </div>
      `).join("");
    }

    const eventsContainer = document.getElementById("student-upcoming-events");
    if (eventsContainer) {
      eventsContainer.innerHTML = events.map(e => `
        <div style="display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);">
          <div style="background: var(--bg-elevated); padding: 8px 12px; border-radius: 8px; text-align: center; border: 1px solid var(--border-subtle); min-width: 64px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">${new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</div>
            <div style="font-size: 1.2rem; font-weight: 800;">${new Date(e.date).getDate()}</div>
          </div>
          <div>
            <div style="font-weight: 600; font-size: 0.925rem;">${e.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="far fa-clock"></i> ${e.time} &bull; ${e.location}</div>
          </div>
        </div>
      `).join("");
    }
  }

  renderPerformanceCharts(student) {
    const ctx = document.getElementById("sgpaTrendChart");
    if (!ctx) return;

    if (this.chartInstances["sgpaTrend"]) {
      this.chartInstances["sgpaTrend"].destroy();
    }

    const semesters = this.store.state.semesterHistory || [];
    const labels = semesters.map(s => `Sem ${s.sem}`);
    const data = semesters.map(s => s.sgpa);

    if (window.Chart) {
      this.chartInstances["sgpaTrend"] = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "SGPA Trend",
            data: data,
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#06b6d4",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              titleColor: "#06b6d4",
              bodyColor: "#f8fafc",
              padding: 10,
              borderColor: "rgba(6, 182, 212, 0.3)",
              borderWidth: 1
            }
          },
          scales: {
            y: {
              min: 7.0,
              max: 10.0,
              grid: { color: "rgba(255, 255, 255, 0.05)" },
              ticks: { color: "#94a3b8" }
            },
            x: {
              grid: { display: false },
              ticks: { color: "#94a3b8" }
            }
          }
        }
      });
    }
  }

  // --- Student Marks & Results Tab ---
  renderStudentMarks() {
    const student = this.store.getCurrentUser();
    if (!student) return;

    const marks = this.store.getMarks(student.id, false);
    const container = document.getElementById("student-marks-table-body");
    if (!container) return;

    if (marks.length === 0) {
      container.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 30px; color: var(--text-muted);">No published marks found for the current semester.</td></tr>`;
      return;
    }

    container.innerHTML = marks.map(m => `
      <tr>
        <td><strong>${m.subjectCode}</strong></td>
        <td>
          <div style="font-weight: 600;">${m.subjectName}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${m.feedback || 'Continuous Evaluation Validated'}</div>
        </td>
        <td><span class="badge badge-cyan">${m.credits}</span></td>
        <td>${m.ia1} / 30</td>
        <td>${m.ia2} / 30</td>
        <td>${m.assignment} / 20</td>
        <td>${m.see} / 50</td>
        <td><strong style="color: var(--accent-cyan); font-size: 1.1rem;">${m.totalMarks}</strong> / 100</td>
        <td>
          <span class="badge ${m.grade === 'O' ? 'badge-emerald' : m.grade.startsWith('A') ? 'badge-cyan' : 'badge-amber'}" style="font-size: 0.9rem; padding: 4px 12px;">
            ${m.grade} (${m.gradePoint})
          </span>
        </td>
      </tr>
    `).join("");

    // Calculate Summary
    const totalCredits = marks.reduce((sum, m) => sum + (Number(m.credits) || 0), 0);
    const totalPoints = marks.reduce((sum, m) => sum + ((m.gradePoint || 0) * (Number(m.credits) || 0)), 0);
    const semGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

    const summaryEl = document.getElementById("marks-summary-box");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Semester 6 Result Status</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-emerald);">FIRST CLASS WITH DISTINCTION</div>
          </div>
          <div style="display: flex; gap: 24px; text-align: right;">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Total Credits</div>
              <div style="font-size: 1.3rem; font-weight: 800;">${totalCredits}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Calculated SGPA</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-cyan);">${semGPA}</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // --- Official Marks Card Printable Generator ---
  openMarksCardModal() {
    const student = this.store.getCurrentUser();
    if (!student) return;

    const marks = this.store.getMarks(student.id, false);
    const config = this.store.getConfig();
    const modal = document.getElementById("marks-card-modal");
    const container = document.getElementById("printable-marks-area");

    const totalCredits = marks.reduce((sum, m) => sum + (Number(m.credits) || 0), 0);
    const totalPoints = marks.reduce((sum, m) => sum + ((m.gradePoint || 0) * (Number(m.credits) || 0)), 0);
    const semGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

    container.innerHTML = `
      <div class="marks-card-document">
        <div class="marks-card-watermark">CAMPUSFOLIO</div>
        
        <div class="univ-header">
          <div class="univ-crest"><i class="fas fa-university"></i></div>
          <div class="univ-title">${config.institutionName}</div>
          <div class="univ-sub">${config.universityAffiliation}</div>
          <div class="marks-card-title">OFFICIAL GRADE CARD / STATEMENT OF MARKS</div>
        </div>

        <div class="student-meta-grid">
          <div class="meta-row"><span class="meta-lbl">Student Name:</span><span class="meta-val">${student.name}</span></div>
          <div class="meta-row"><span class="meta-lbl">University Seat No:</span><span class="meta-val">${student.usn}</span></div>
          <div class="meta-row"><span class="meta-lbl">Department:</span><span class="meta-val">${student.departmentName}</span></div>
          <div class="meta-row"><span class="meta-lbl">Semester / Sec:</span><span class="meta-val">${student.sem}th Semester / Sec ${student.section}</span></div>
          <div class="meta-row"><span class="meta-lbl">Academic Year:</span><span class="meta-val">${config.currentAcademicYear}</span></div>
          <div class="meta-row"><span class="meta-lbl">Issue Date:</span><span class="meta-val">${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
        </div>

        <table class="marks-official-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credits</th>
              <th>Continuous Eval (50)</th>
              <th>Semester Exam (50)</th>
              <th>Total (100)</th>
              <th>Letter Grade</th>
              <th>Grade Point</th>
              <th>Credit Points</th>
            </tr>
          </thead>
          <tbody>
            ${marks.map(m => {
              const cie = Math.round((((m.ia1 + m.ia2)/2) * (30/30)) + m.assignment);
              return `
                <tr>
                  <td><strong>${m.subjectCode}</strong></td>
                  <td>${m.subjectName}</td>
                  <td>${m.credits}</td>
                  <td>${cie}</td>
                  <td>${m.see}</td>
                  <td><strong>${m.totalMarks}</strong></td>
                  <td><strong>${m.grade}</strong></td>
                  <td>${m.gradePoint}</td>
                  <td><strong>${(m.gradePoint * m.credits).toFixed(0)}</strong></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>

        <div class="marks-summary-bar">
          <div>TOTAL CREDITS EARNED: ${totalCredits}</div>
          <div>SEMESTER GRADE POINT AVERAGE (SGPA): ${semGPA}</div>
          <div>CUMULATIVE GPA: ${student.cgpa.toFixed(2)}</div>
        </div>

        <div style="font-size: 0.75rem; color: #64748b; line-height: 1.5; margin-bottom: 24px;">
          <strong>Grading Scheme:</strong> O (Outstanding, 10 pts) | A+ (Excellent, 9 pts) | A (Very Good, 8 pts) | B+ (Good, 7 pts) | B (Above Average, 6 pts) | C (Pass, 5 pts) | F (Fail, 0 pts). Minimum passing marks in SEE is 40% and Total 40%.
        </div>

        <div class="marks-signatures">
          <div class="sig-box">
            <div class="sig-line"></div>
            <div class="sig-title">Class Mentor / Faculty Advisor</div>
          </div>
          <div class="sig-box">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0891b2; margin-bottom: 6px;">[DIGITALLY VERIFIED]</div>
            <div class="sig-line"></div>
            <div class="sig-title">Head of Department (CSE)</div>
          </div>
          <div class="sig-box">
            <div class="sig-line"></div>
            <div class="sig-title">Controller of Examinations</div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove("active");
  }

  printMarksCard() {
    window.print();
  }

  // --- Student Attendance Tracker ---
  renderStudentAttendance() {
    const student = this.store.getCurrentUser();
    if (!student) return;

    const list = this.store.getAttendance(student.id);
    const overall = this.store.getOverallAttendance(student.id);
    const tbody = document.getElementById("attendance-table-body");
    const threshold = this.store.getConfig().attendanceWarningThreshold || 75;

    // Overall banner
    const ovBanner = document.getElementById("attendance-overview-banner");
    if (ovBanner) {
      ovBanner.innerHTML = `
        <div class="glass-panel" style="padding: 24px; margin-bottom: 24px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
          <div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Overall Percentage</div>
            <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: ${overall.hasShortage ? 'var(--accent-rose)' : 'var(--accent-cyan)'};">${overall.percentage}%</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Required Threshold: ${threshold}%</div>
          </div>
          <div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Total Classes</div>
            <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800;">${overall.totalClasses}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Conducted to date</div>
          </div>
          <div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Attended Classes</div>
            <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: var(--accent-emerald);">${overall.attendedClasses}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Classes present</div>
          </div>
          <div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Missed / Absent</div>
            <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: var(--accent-rose);">${overall.missedClasses}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Absences logged</div>
          </div>
        </div>
      `;
    }

    if (tbody) {
      if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">No attendance records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = list.map(item => {
        const isShortage = item.percentage < threshold;
        // Calculator: how many consecutive classes to attend to reach 75%
        // (attended + x) / (total + x) = 0.75 => x = (0.75*total - attended) / 0.25
        let classesToAttend = 0;
        if (isShortage) {
          classesToAttend = Math.max(0, Math.ceil((0.75 * item.totalClasses - item.attendedClasses) / 0.25));
        }

        return `
          <tr>
            <td><strong>${item.subjectCode}</strong></td>
            <td><strong>${item.subjectName}</strong></td>
            <td>${item.totalClasses}</td>
            <td style="color: var(--accent-emerald); font-weight: 600;">${item.attendedClasses}</td>
            <td style="color: var(--accent-rose); font-weight: 600;">${item.missedClasses}</td>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-weight: 700; width: 45px; color: ${isShortage ? 'var(--accent-rose)' : 'var(--accent-cyan)'};">${item.percentage}%</span>
                <div class="progress-track" style="flex: 1; margin: 0;">
                  <div class="progress-fill ${isShortage ? 'rose' : 'cyan'}" style="width: ${Math.min(100, item.percentage)}%"></div>
                </div>
              </div>
            </td>
            <td>
              ${isShortage ? `
                <span class="badge badge-rose" title="Attend ${classesToAttend} consecutive classes to reach 75%">
                  <i class="fas fa-exclamation-circle"></i> Shortage (Attend ${classesToAttend} more)
                </span>
              ` : `
                <span class="badge badge-emerald">
                  <i class="fas fa-check-circle"></i> Good Standing
                </span>
              `}
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  // --- Student Portfolio Builder ---
  renderStudentPortfolioBuilder() {
    const student = this.store.getCurrentUser();
    if (!student) return;

    // Populate inputs
    document.getElementById("port-name").value = student.name || "";
    document.getElementById("port-tagline").value = student.tagline || "";
    document.getElementById("port-bio").value = student.bio || "";
    document.getElementById("port-github").value = student.socials?.github || "";
    document.getElementById("port-linkedin").value = student.socials?.linkedin || "";
    document.getElementById("port-twitter").value = student.socials?.twitter || "";
    document.getElementById("port-leetcode").value = student.socials?.leetcode || "";

    // Render Skills Chips
    const skillsContainer = document.getElementById("port-skills-list");
    if (skillsContainer) {
      skillsContainer.innerHTML = (student.skills || []).map((sk, idx) => `
        <span class="skill-chip">
          <strong>${sk.name}</strong> (${sk.category} - ${sk.level}%)
          <button onclick="window.app.deleteSkill(${idx})" style="color: var(--accent-rose); margin-left: 6px;">&times;</button>
        </span>
      `).join("");
    }

    // Render Projects
    const projectsContainer = document.getElementById("port-projects-list");
    if (projectsContainer) {
      projectsContainer.innerHTML = (student.projects || []).map(p => `
        <div class="project-item-card">
          <img src="${p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'}" class="project-img" alt="${p.title}">
          <div class="project-body">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <h4 style="font-weight: 700; font-size: 1.1rem;">${p.title}</h4>
              <button onclick="window.app.deleteProject('${p.id}')" style="color: var(--accent-rose); font-size: 0.9rem;" title="Delete Project"><i class="fas fa-trash-alt"></i></button>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; flex: 1;">${p.description}</p>
            <div class="project-tags">
              ${(p.technologies || []).map(t => `<span class="badge badge-cyan" style="font-size: 0.7rem;">${t}</span>`).join("")}
            </div>
            <div style="display: flex; gap: 10px; margin-top: 12px;">
              ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-sm btn-secondary"><i class="fab fa-github"></i> Code</a>` : ''}
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="btn btn-sm btn-cyan"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
          </div>
        </div>
      `).join("");
    }

    // Certifications
    const certsContainer = document.getElementById("port-certs-list");
    if (certsContainer) {
      certsContainer.innerHTML = (student.certifications || []).map(c => `
        <div style="background: var(--bg-elevated); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 700; font-size: 0.95rem;">${c.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">${c.issuer} &bull; ${c.date}</div>
          </div>
          <span class="badge badge-emerald"><i class="fas fa-check"></i> Verified</span>
        </div>
      `).join("");
    }

    // Public link preview
    const shareUrl = `${window.location.origin}${window.location.pathname.replace('index.html', '')}portfolio.html?usn=${student.usn}`;
    const linkInput = document.getElementById("shareable-portfolio-url");
    if (linkInput) {
      linkInput.value = shareUrl;
    }
  }

  savePortfolioChanges() {
    const student = this.store.getCurrentUser();
    if (!student) return;

    const updates = {
      name: document.getElementById("port-name").value,
      tagline: document.getElementById("port-tagline").value,
      bio: document.getElementById("port-bio").value,
      socials: {
        github: document.getElementById("port-github").value,
        linkedin: document.getElementById("port-linkedin").value,
        twitter: document.getElementById("port-twitter").value,
        leetcode: document.getElementById("port-leetcode").value
      }
    };

    this.store.updatePortfolio(student.id, updates);
    this.showToast("Portfolio changes saved successfully!", "success");
  }

  addSkillPrompt() {
    const name = prompt("Enter Skill Name (e.g. Docker, React, Python):");
    if (!name) return;
    const category = prompt("Enter Skill Category (e.g. Languages, Frontend, Cloud):", "Tech");
    const level = Number(prompt("Enter proficiency percentage (1-100):", "85")) || 80;

    const student = this.store.getCurrentUser();
    if (!student) return;
    if (!student.skills) student.skills = [];
    student.skills.push({ name, category, level });
    this.store.updateStudent(student.id, { skills: student.skills });
    this.renderStudentPortfolioBuilder();
    this.showToast(`Added ${name} to your skills!`, "success");
  }

  deleteSkill(index) {
    const student = this.store.getCurrentUser();
    if (!student || !student.skills) return;
    student.skills.splice(index, 1);
    this.store.updateStudent(student.id, { skills: student.skills });
    this.renderStudentPortfolioBuilder();
  }

  openAddProjectModal() {
    document.getElementById("add-project-modal")?.classList.add("active");
  }

  submitNewProject(e) {
    e.preventDefault();
    const student = this.store.getCurrentUser();
    if (!student) return;

    const title = document.getElementById("proj-title").value;
    const description = document.getElementById("proj-desc").value;
    const tagsRaw = document.getElementById("proj-tech").value;
    const github = document.getElementById("proj-github").value;
    const liveUrl = document.getElementById("proj-live").value;
    const image = document.getElementById("proj-image").value || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80";

    const technologies = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);

    this.store.addProject(student.id, {
      title,
      description,
      technologies,
      github,
      liveUrl,
      image,
      featured: true
    });

    this.closeModal("add-project-modal");
    this.renderStudentPortfolioBuilder();
    this.showToast(`Project "${title}" published to portfolio!`, "success");
    e.target.reset();
  }

  deleteProject(projectId) {
    if (confirm("Are you sure you want to remove this project from your portfolio?")) {
      const student = this.store.getCurrentUser();
      if (!student) return;
      this.store.deleteProject(student.id, projectId);
      this.renderStudentPortfolioBuilder();
      this.showToast("Project deleted.", "info");
    }
  }

  copyPortfolioLink() {
    const linkInput = document.getElementById("shareable-portfolio-url");
    if (linkInput) {
      navigator.clipboard.writeText(linkInput.value);
      this.showToast("Public Portfolio link copied to clipboard!", "success");
    }
  }

  // --- Faculty Dashboard Renderers ---
  renderFacultyClasses() {
    const fac = this.store.getCurrentUser();
    if (!fac) return;

    const container = document.getElementById("faculty-courses-grid");
    if (!container) return;

    const subjects = this.store.getSubjects().filter(s => fac.assignedSubjects.includes(s.code));
    const allStudents = this.store.getStudents();

    container.innerHTML = subjects.map(sub => {
      const enrolled = allStudents.filter(st => st.dept === sub.dept && st.sem === sub.sem);
      return `
        <div class="card-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <span class="badge badge-cyan">${sub.code}</span>
              <span class="badge badge-blue">${sub.dept} &bull; Sem ${sub.sem}</span>
            </div>
            <span style="font-weight: 700; color: var(--accent-cyan);">${sub.credits} Credits</span>
          </div>
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">${sub.name}</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
            Enrolled Students: <strong>${enrolled.length}</strong> active students
          </p>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-sm btn-cyan" onclick="window.app.loadFacultyGradingFor('${sub.code}')">
              <i class="fas fa-edit"></i> Enter Marks
            </button>
            <button class="btn btn-sm btn-secondary" onclick="window.app.loadFacultyAttendanceFor('${sub.code}')">
              <i class="fas fa-clipboard-check"></i> Attendance
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  loadFacultyGradingFor(subjectCode) {
    this.switchTab("faculty-marks");
    const select = document.getElementById("faculty-subject-select");
    if (select) {
      select.value = subjectCode;
      this.renderFacultyMarksTable();
    }
  }

  loadFacultyAttendanceFor(subjectCode) {
    this.switchTab("faculty-attendance");
    const select = document.getElementById("faculty-att-subject-select");
    if (select) {
      select.value = subjectCode;
      this.renderFacultyAttendanceSheet();
    }
  }

  renderFacultyMarksManager() {
    const fac = this.store.getCurrentUser();
    if (!fac) return;

    const select = document.getElementById("faculty-subject-select");
    if (select) {
      const assigned = this.store.getSubjects().filter(s => fac.assignedSubjects.includes(s.code));
      select.innerHTML = assigned.map(s => `<option value="${s.code}">${s.code} - ${s.name}</option>`).join("");
      select.onchange = () => this.renderFacultyMarksTable();
    }

    this.renderFacultyMarksTable();
  }

  renderFacultyMarksTable() {
    const subCode = document.getElementById("faculty-subject-select")?.value;
    if (!subCode) return;

    const subject = this.store.getSubjectByCode(subCode);
    const students = this.store.getStudents().filter(s => s.dept === subject?.dept && s.sem === subject?.sem);
    const tbody = document.getElementById("faculty-marks-tbody");
    if (!tbody) return;

    const allMarks = this.store.getMarks(null, true);

    tbody.innerHTML = students.map(st => {
      const mark = allMarks.find(m => m.studentId === st.id && m.subjectCode === subCode) || {
        ia1: 0, ia2: 0, ia3: 0, assignment: 0, see: 0, totalMarks: 0, grade: "-", status: "Draft"
      };

      return `
        <tr>
          <td><strong>${st.usn}</strong></td>
          <td>${st.name}</td>
          <td><input type="number" min="0" max="30" class="form-control" style="width: 75px;" value="${mark.ia1 || 0}" id="ia1_${st.id}"></td>
          <td><input type="number" min="0" max="30" class="form-control" style="width: 75px;" value="${mark.ia2 || 0}" id="ia2_${st.id}"></td>
          <td><input type="number" min="0" max="20" class="form-control" style="width: 75px;" value="${mark.assignment || 0}" id="asgn_${st.id}"></td>
          <td><input type="number" min="0" max="50" class="form-control" style="width: 75px;" value="${mark.see || 0}" id="see_${st.id}"></td>
          <td><strong style="font-size: 1.1rem; color: var(--accent-cyan);">${mark.totalMarks || 0}</strong></td>
          <td><span class="badge ${mark.status === 'Published' ? 'badge-emerald' : 'badge-amber'}">${mark.status || 'Draft'}</span></td>
          <td>
            <button class="btn btn-sm btn-secondary" onclick="window.app.saveSingleStudentMark('${st.id}', '${subCode}')">
              <i class="fas fa-save"></i> Save
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  saveSingleStudentMark(studentId, subjectCode) {
    const subject = this.store.getSubjectByCode(subjectCode);
    const ia1 = Number(document.getElementById(`ia1_${studentId}`).value) || 0;
    const ia2 = Number(document.getElementById(`ia2_${studentId}`).value) || 0;
    const assignment = Number(document.getElementById(`asgn_${studentId}`).value) || 0;
    const see = Number(document.getElementById(`see_${studentId}`).value) || 0;

    this.store.saveMark({
      studentId,
      subjectCode,
      subjectName: subject?.name || subjectCode,
      credits: subject?.credits || 4,
      ia1,
      ia2,
      ia3: ia2,
      assignment,
      see,
      status: "Draft",
      publishedBy: this.store.getSession().userId
    });

    this.showToast(`Draft marks saved for student ${studentId}`, "info");
    this.renderFacultyMarksTable();
  }

  publishAllMarksForCurrentSubject() {
    const subCode = document.getElementById("faculty-subject-select")?.value;
    if (!subCode) return;

    if (confirm(`Are you sure you want to PUBLISH all marks for ${subCode}? Once published, students will immediately be able to view their final grades and download their marks cards.`)) {
      this.store.publishMarksForSubject(subCode);
      this.showToast(`All marks for ${subCode} have been published!`, "success");
      this.renderFacultyMarksTable();
    }
  }

  // --- Faculty Attendance Management ---
  renderFacultyAttendanceManager() {
    const fac = this.store.getCurrentUser();
    if (!fac) return;

    const select = document.getElementById("faculty-att-subject-select");
    if (select) {
      const assigned = this.store.getSubjects().filter(s => fac.assignedSubjects.includes(s.code));
      select.innerHTML = assigned.map(s => `<option value="${s.code}">${s.code} - ${s.name}</option>`).join("");
      select.onchange = () => this.renderFacultyAttendanceSheet();
    }

    this.renderFacultyAttendanceSheet();
  }

  renderFacultyAttendanceSheet() {
    const subCode = document.getElementById("faculty-att-subject-select")?.value;
    if (!subCode) return;

    const subject = this.store.getSubjectByCode(subCode);
    const students = this.store.getStudents().filter(s => s.dept === subject?.dept && s.sem === subject?.sem);
    const tbody = document.getElementById("faculty-att-tbody");
    if (!tbody) return;

    const allAtt = this.store.getAttendance();

    tbody.innerHTML = students.map(st => {
      const record = allAtt.find(a => a.studentId === st.id && a.subjectCode === subCode) || {
        totalClasses: 45, attendedClasses: 40, percentage: 88.9
      };

      return `
        <tr>
          <td><strong>${st.usn}</strong></td>
          <td>${st.name}</td>
          <td>
            <input type="number" min="0" class="form-control" style="width: 80px;" value="${record.totalClasses}" id="tot_${st.id}">
          </td>
          <td>
            <input type="number" min="0" class="form-control" style="width: 80px;" value="${record.attendedClasses}" id="att_${st.id}">
          </td>
          <td>
            <strong style="color: ${record.percentage < 75 ? 'var(--accent-rose)' : 'var(--accent-emerald)'}; font-size: 1.1rem;">
              ${record.percentage}%
            </strong>
          </td>
          <td>
            <button class="btn btn-sm btn-cyan" onclick="window.app.saveSingleAttendance('${st.id}', '${subCode}')">
              Update
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  saveSingleAttendance(studentId, subjectCode) {
    const subject = this.store.getSubjectByCode(subjectCode);
    const total = Number(document.getElementById(`tot_${studentId}`).value) || 0;
    const attended = Number(document.getElementById(`att_${studentId}`).value) || 0;

    this.store.updateAttendance({
      studentId,
      subjectCode,
      subjectName: subject?.name || subjectCode,
      totalClasses: total,
      attendedClasses: attended
    });

    this.showToast(`Attendance updated for student ${studentId}`, "success");
    this.renderFacultyAttendanceSheet();
  }

  // --- Administrator Dashboard Renderers ---
  renderAdminOverview() {
    const students = this.store.getStudents();
    const faculty = this.store.getFaculty();
    const depts = this.store.state.departments;
    const subjects = this.store.getSubjects();

    document.getElementById("adm-stat-students").textContent = students.length;
    document.getElementById("adm-stat-faculty").textContent = faculty.length;
    document.getElementById("adm-stat-depts").textContent = depts.length;
    document.getElementById("adm-stat-subjects").textContent = subjects.length;

    // Render Recent Audit Logs snippet
    const logsSnippet = document.getElementById("admin-recent-logs");
    if (logsSnippet) {
      const logs = this.store.getAuditLogs().slice(0, 5);
      logsSnippet.innerHTML = logs.map(l => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
          <div>
            <span class="badge ${l.role === 'ADMIN' ? 'badge-rose' : l.role === 'FACULTY' ? 'badge-cyan' : 'badge-emerald'}" style="margin-right: 8px;">${l.role}</span>
            <strong>${l.user}</strong> &bull; ${l.action}
            <div style="color: var(--text-muted); font-size: 0.775rem;">${l.details}</div>
          </div>
          <span style="color: var(--text-muted); font-size: 0.75rem;">${l.timestamp}</span>
        </div>
      `).join("");
    }
  }

  renderAdminStudents() {
    const tbody = document.getElementById("admin-students-tbody");
    if (!tbody) return;

    const students = this.store.getStudents();
    tbody.innerHTML = students.map(s => `
      <tr>
        <td><strong>${s.usn}</strong></td>
        <td>
          <div style="font-weight: 600;">${s.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${s.email}</div>
        </td>
        <td>${s.departmentName}</td>
        <td>Sem ${s.sem}</td>
        <td><strong>${s.cgpa.toFixed(2)}</strong></td>
        <td>
          <span class="badge ${s.status === 'Active' ? 'badge-emerald' : 'badge-rose'}">
            ${s.status}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 8px;">
            <a href="portfolio.html?usn=${s.usn}" target="_blank" class="btn btn-sm btn-secondary" title="View Public Portfolio">
              <i class="fas fa-external-link-alt"></i>
            </a>
            <button class="btn btn-sm ${s.status === 'Active' ? 'btn-danger' : 'btn-cyan'}" onclick="window.app.toggleStudentStatus('${s.id}')">
              ${s.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  toggleStudentStatus(id) {
    this.store.toggleStudentStatus(id);
    this.renderAdminStudents();
    this.showToast("Student status toggled.", "info");
  }

  openAddStudentModal() {
    document.getElementById("add-student-modal")?.classList.add("active");
  }

  submitNewStudent(e) {
    e.preventDefault();
    const name = document.getElementById("adm-st-name").value;
    const usn = document.getElementById("adm-st-usn").value;
    const email = document.getElementById("adm-st-email").value;
    const dept = document.getElementById("adm-st-dept").value;
    const sem = Number(document.getElementById("adm-st-sem").value) || 6;

    const deptObj = this.store.state.departments.find(d => d.id === dept);

    this.store.addStudent({
      name,
      usn,
      email,
      dept,
      departmentName: deptObj?.name || dept,
      sem,
      section: "A",
      cgpa: 8.0,
      sgpa: 8.0,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
    });

    this.closeModal("add-student-modal");
    this.renderAdminStudents();
    this.renderRoleSwitcher();
    this.showToast(`Enrolled new student: ${name} (${usn})`, "success");
    e.target.reset();
  }

  renderAdminFaculty() {
    const tbody = document.getElementById("admin-faculty-tbody");
    if (!tbody) return;

    const faculty = this.store.getFaculty();
    tbody.innerHTML = faculty.map(f => `
      <tr>
        <td><strong>${f.id}</strong></td>
        <td>
          <div style="font-weight: 600;">${f.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${f.email}</div>
        </td>
        <td>${f.designation}</td>
        <td>${f.departmentName}</td>
        <td>
          ${f.assignedSubjects.map(s => `<span class="badge badge-cyan" style="margin-right: 4px;">${s}</span>`).join("")}
        </td>
      </tr>
    `).join("");
  }

  renderAdminSettings() {
    const config = this.store.getConfig();
    document.getElementById("cfg-inst-name").value = config.institutionName;
    document.getElementById("cfg-univ-affil").value = config.universityAffiliation;
    document.getElementById("cfg-acad-year").value = config.currentAcademicYear;
    document.getElementById("cfg-att-threshold").value = config.attendanceWarningThreshold;
  }

  saveAdminSettings(e) {
    e.preventDefault();
    const institutionName = document.getElementById("cfg-inst-name").value;
    const universityAffiliation = document.getElementById("cfg-univ-affil").value;
    const currentAcademicYear = document.getElementById("cfg-acad-year").value;
    const attendanceWarningThreshold = Number(document.getElementById("cfg-att-threshold").value) || 75;

    this.store.updateConfig({
      institutionName,
      universityAffiliation,
      currentAcademicYear,
      attendanceWarningThreshold
    });

    this.showToast("System configuration updated successfully!", "success");
  }

  renderAdminAuditLogs() {
    const tbody = document.getElementById("admin-audit-tbody");
    if (!tbody) return;

    const logs = this.store.getAuditLogs();
    tbody.innerHTML = logs.map(l => `
      <tr>
        <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${l.timestamp}</td>
        <td>
          <span class="badge ${l.role === 'ADMIN' ? 'badge-rose' : l.role === 'FACULTY' ? 'badge-cyan' : 'badge-emerald'}">
            ${l.role}
          </span>
        </td>
        <td><strong>${l.user}</strong></td>
        <td><strong>${l.action}</strong></td>
        <td style="font-size: 0.85rem; color: var(--text-secondary);">${l.details}</td>
        <td style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">${l.ip}</td>
      </tr>
    `).join("");
  }

  // --- Academic Calendar Tab ---
  renderAcademicCalendar() {
    const list = this.store.state.calendarEvents || [];
    const container = document.getElementById("academic-calendar-events");
    if (!container) return;

    container.innerHTML = list.map(e => `
      <div class="card-box" style="margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="background: var(--bg-elevated); padding: 12px 16px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--border-subtle); min-width: 80px;">
            <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">${new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</div>
            <div style="font-size: 1.6rem; font-weight: 800; line-height: 1.1;">${new Date(e.date).getDate()}</div>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge ${e.type === 'Exam' ? 'badge-rose' : 'badge-cyan'}">${e.type}</span>
              <h4 style="font-weight: 700; font-size: 1.1rem;">${e.title}</h4>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">
              <i class="far fa-clock"></i> ${e.time} &bull; <i class="fas fa-map-marker-alt"></i> ${e.location}
            </div>
          </div>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.showToast('Event added to your calendar reminder!', 'success')">
          <i class="far fa-bell"></i> Remind Me
        </button>
      </div>
    `).join("");
  }

  // --- Placement Prep Tab ---
  renderPlacementPrep() {
    // Already populated in static template with rich resources
  }

  // --- Announcements Tab ---
  renderAnnouncementsTab() {
    const list = this.store.getAnnouncements();
    const container = document.getElementById("faculty-announcements-list");
    if (!container) return;

    container.innerHTML = list.map(a => `
      <div class="card-box">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span class="badge badge-cyan">${a.category}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${a.date} &bull; Published by: ${a.author}</span>
        </div>
        <h4 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">${a.title}</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${a.content}</p>
      </div>
    `).join("");
  }

  publishNewAnnouncement(e) {
    e.preventDefault();
    const title = document.getElementById("new-ann-title").value;
    const category = document.getElementById("new-ann-cat").value;
    const content = document.getElementById("new-ann-content").value;

    this.store.addAnnouncement({ title, category, content });
    this.showToast("Announcement published across campus!", "success");
    this.renderAnnouncementsTab();
    e.target.reset();
  }

  // --- Notifications Drawer ---
  toggleNotificationModal() {
    const modal = document.getElementById("notification-modal");
    if (!modal) return;
    const isActive = modal.classList.contains("active");
    if (isActive) {
      modal.classList.remove("active");
    } else {
      this.renderNotificationList();
      modal.classList.add("active");
      this.store.markAllNotificationsRead();
      this.renderNotificationCount();
    }
  }

  renderNotificationList() {
    const list = this.store.getNotifications();
    const container = document.getElementById("notification-items-container");
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">No notifications.</div>`;
      return;
    }

    container.innerHTML = list.map(n => `
      <div style="padding: 12px; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: flex-start;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--bg-elevated); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan); font-size: 0.9rem;">
          <i class="fas fa-bell"></i>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">${n.title}</div>
          <div style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.4;">${n.message}</div>
          <div style="font-size: 0.725rem; color: var(--text-muted); margin-top: 4px;">${n.time}</div>
        </div>
      </div>
    `).join("");
  }

  // --- Global Event Listeners ---
  bindGlobalEvents() {
    // Quick Demo Role Switcher
    const select = document.getElementById("quick-role-select");
    if (select) {
      select.addEventListener("change", (e) => {
        const [role, id] = e.target.value.split(":");
        this.switchUser(role, id);
      });
    }

    // Mobile sidebar toggle
    const menuBtn = document.getElementById("menu-toggle-btn");
    const sidebar = document.querySelector(".app-sidebar");
    if (menuBtn && sidebar) {
      menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("mobile-open");
      });
    }

    // Modal background click to close
    document.querySelectorAll(".modal-overlay").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    });
  }

  render() {
    this.renderRoleSwitcher();
    this.renderNotificationCount();
  }
}

// Global App Instance
document.addEventListener("DOMContentLoaded", () => {
  window.app = new CampusApp();
});
