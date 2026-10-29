/**
 * CampusFolio - State Management Layer (LocalStorage backed)
 * Provides synchronous read/write, reactivity, and role authentication.
 */

class CampusStore {
  constructor() {
    this.STORAGE_KEY = "campusfolio_state_v1";
    this.listeners = [];
    this.init();
  }

  init() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      this.state = JSON.parse(JSON.stringify(window.CAMPUS_SEED || {}));
      // Default session is the primary student: Shreenidhi N
      this.state.session = {
        role: "STUDENT",
        userId: "STD001",
        name: "Shreenidhi N",
        email: "shreenidhi.cs21@campus.edu"
      };
      this.state.theme = "dark";
      this.persist();
    } else {
      try {
        this.state = JSON.parse(raw);
        // Ensure valid session
        if (!this.state.session) {
          this.state.session = {
            role: "STUDENT",
            userId: "STD001",
            name: "Shreenidhi N",
            email: "shreenidhi.cs21@campus.edu"
          };
        }
      } catch (e) {
        console.error("Failed to parse stored state, resetting to seed", e);
        this.state = JSON.parse(JSON.stringify(window.CAMPUS_SEED || {}));
        this.persist();
      }
    }
  }

  persist() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  resetToDefault() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.init();
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this.state);
      } catch (err) {
        console.error("Store listener error:", err);
      }
    });
  }

  // --- Auth & Session ---
  getSession() {
    return this.state.session;
  }

  setSession(role, userId) {
    let name = "User";
    let email = "";

    if (role === "STUDENT") {
      const student = this.getStudentById(userId) || this.state.students[0];
      name = student.name;
      email = student.email;
      userId = student.id;
    } else if (role === "FACULTY") {
      const fac = this.getFacultyById(userId) || this.state.faculty[0];
      name = fac.name;
      email = fac.email;
      userId = fac.id;
    } else if (role === "ADMIN") {
      name = this.state.admin.name;
      email = this.state.admin.email;
      userId = this.state.admin.id;
    }

    this.state.session = { role, userId, name, email };
    this.addAuditLog(name, role, "Session Switched", `Logged in / Switched role to ${role} (${name})`);
    this.persist();
  }

  logout() {
    this.state.session = null;
    this.persist();
  }

  // --- Theme ---
  getTheme() {
    return this.state.theme || "dark";
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.persist();
  }

  toggleTheme() {
    const next = this.getTheme() === "dark" ? "light" : "dark";
    this.setTheme(next);
    return next;
  }

  // --- Configuration ---
  getConfig() {
    return this.state.config;
  }

  updateConfig(updates) {
    this.state.config = { ...this.state.config, ...updates };
    this.addAuditLog(this.state.session.name, this.state.session.role, "System Config Updated", `Updated academic configuration`);
    this.persist();
  }

  // --- Current User Helpers ---
  getCurrentUser() {
    const session = this.getSession();
    if (!session) return null;
    if (session.role === "STUDENT") {
      return this.getStudentById(session.userId);
    } else if (session.role === "FACULTY") {
      return this.getFacultyById(session.userId);
    } else if (session.role === "ADMIN") {
      return this.state.admin;
    }
    return null;
  }

  // --- Students ---
  getStudents() {
    return this.state.students || [];
  }

  getStudentById(id) {
    return (this.state.students || []).find(s => s.id === id || s.usn === id);
  }

  getStudentBySlug(slug) {
    return (this.state.students || []).find(s => s.portfolioSlug === slug || s.usn === slug || s.id === slug);
  }

  addStudent(studentData) {
    const newStudent = {
      id: "STD" + String(this.state.students.length + 1).padStart(3, "0"),
      cgpa: 0.0,
      sgpa: 0.0,
      totalCredits: 0,
      status: "Active",
      portfolioSlug: studentData.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      skills: [],
      projects: [],
      certifications: [],
      achievements: [],
      education: [],
      ...studentData
    };
    this.state.students.push(newStudent);
    this.addAuditLog(this.state.session.name, this.state.session.role, "Student Created", `Enrolled new student: ${newStudent.name} (${newStudent.usn})`);
    this.persist();
    return newStudent;
  }

  updateStudent(id, updates) {
    const idx = this.state.students.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.state.students[idx] = { ...this.state.students[idx], ...updates };
      this.persist();
      return this.state.students[idx];
    }
    return null;
  }

  toggleStudentStatus(id) {
    const student = this.getStudentById(id);
    if (student) {
      student.status = student.status === "Active" ? "Suspended" : "Active";
      this.addAuditLog(this.state.session.name, this.state.session.role, "Student Status Changed", `Changed ${student.name} status to ${student.status}`);
      this.persist();
    }
  }

  // --- Faculty ---
  getFaculty() {
    return this.state.faculty || [];
  }

  getFacultyById(id) {
    return (this.state.faculty || []).find(f => f.id === id);
  }

  // --- Subjects ---
  getSubjects() {
    return this.state.subjects || [];
  }

  getSubjectByCode(code) {
    return (this.state.subjects || []).find(s => s.code === code);
  }

  // --- Marks Management ---
  getMarks(studentId = null, includeDrafts = false) {
    let list = this.state.marks || [];
    if (studentId) {
      list = list.filter(m => m.studentId === studentId);
    }
    // Security / Visibility constraint:
    // Students must only see Published marks. Faculty & Admin can see Drafts.
    if (!includeDrafts && this.state.session?.role === "STUDENT") {
      list = list.filter(m => m.status === "Published");
    }
    return list;
  }

  calculateGrade(total) {
    const scale = this.state.config.gradingScale;
    for (const tier of scale) {
      if (total >= tier.min) {
        return { grade: tier.grade, gradePoint: tier.point };
      }
    }
    return { grade: "F", gradePoint: 0 };
  }

  saveMark(markRecord) {
    // Calculate total:
    // IA: best 2 of 3 (each out of 30) or average out of 30
    const iaScores = [markRecord.ia1, markRecord.ia2, markRecord.ia3].map(v => Number(v) || 0);
    iaScores.sort((a, b) => b - a);
    const iaAverage = Math.round((iaScores[0] + iaScores[1]) / 2); // Out of 30
    const assignment = Number(markRecord.assignment) || 0; // Out of 20
    const see = Number(markRecord.see) || 0; // Out of 50
    const lab = markRecord.lab !== undefined && markRecord.lab !== null ? Number(markRecord.lab) : null;

    let total = iaAverage + assignment + see;
    if (lab !== null) {
      // If lab exists, normalize total to 100
      total = Math.min(100, Math.round(total * 0.8 + lab));
    }
    total = Math.min(100, Math.max(0, total));

    const { grade, gradePoint } = this.calculateGrade(total);

    const fullRecord = {
      ...markRecord,
      totalMarks: total,
      grade,
      gradePoint,
      lastModified: new Date().toISOString()
    };

    const existingIdx = (this.state.marks || []).findIndex(
      m => m.studentId === markRecord.studentId && m.subjectCode === markRecord.subjectCode
    );

    if (existingIdx !== -1) {
      this.state.marks[existingIdx] = { ...this.state.marks[existingIdx], ...fullRecord };
    } else {
      this.state.marks.push(fullRecord);
    }

    this.recalculateStudentGPA(markRecord.studentId);
    this.addAuditLog(
      this.state.session.name,
      this.state.session.role,
      markRecord.status === "Published" ? "Published Marks" : "Saved Draft Marks",
      `Subject ${markRecord.subjectCode} for student ${markRecord.studentId} (Total: ${total}, Grade: ${grade})`
    );
    this.persist();
  }

  publishMarksForSubject(subjectCode) {
    let count = 0;
    this.state.marks = (this.state.marks || []).map(m => {
      if (m.subjectCode === subjectCode) {
        count++;
        return {
          ...m,
          status: "Published",
          publishedBy: this.state.session.userId,
          publishedDate: new Date().toISOString().split("T")[0]
        };
      }
      return m;
    });

    this.addAuditLog(
      this.state.session.name,
      this.state.session.role,
      "Bulk Published Marks",
      `Published marks for all enrolled students in ${subjectCode} (${count} records)`
    );
    this.persist();
  }

  recalculateStudentGPA(studentId) {
    const studentMarks = (this.state.marks || []).filter(
      m => m.studentId === studentId && m.status === "Published"
    );
    if (!studentMarks.length) return;

    let totalCreditPoints = 0;
    let totalCredits = 0;

    studentMarks.forEach(m => {
      const credits = Number(m.credits) || 3;
      totalCredits += credits;
      totalCreditPoints += (m.gradePoint * credits);
    });

    const sgpa = totalCredits > 0 ? Number((totalCreditPoints / totalCredits).toFixed(2)) : 0;
    const student = this.getStudentById(studentId);
    if (student) {
      student.sgpa = sgpa;
      // Slight weighted blend for CGPA
      student.cgpa = Number(((student.cgpa * 5 + sgpa) / 6).toFixed(2));
    }
  }

  // --- Attendance Management ---
  getAttendance(studentId = null) {
    let list = this.state.attendance || [];
    if (studentId) {
      list = list.filter(a => a.studentId === studentId);
    }
    return list;
  }

  getOverallAttendance(studentId) {
    const records = this.getAttendance(studentId);
    if (!records.length) return { percentage: 0, totalClasses: 0, attendedClasses: 0, missedClasses: 0, hasShortage: false };

    let total = 0;
    let attended = 0;
    records.forEach(r => {
      total += Number(r.totalClasses) || 0;
      attended += Number(r.attendedClasses) || 0;
    });

    const missed = total - attended;
    const percentage = total > 0 ? Number(((attended / total) * 100).toFixed(1)) : 0;
    const threshold = this.state.config.attendanceWarningThreshold || 75;

    return {
      percentage,
      totalClasses: total,
      attendedClasses: attended,
      missedClasses: missed,
      hasShortage: percentage < threshold,
      threshold
    };
  }

  updateAttendance(record) {
    const total = Number(record.totalClasses) || 0;
    const attended = Number(record.attendedClasses) || 0;
    const missed = Math.max(0, total - attended);
    const percentage = total > 0 ? Number(((attended / total) * 100).toFixed(1)) : 0;

    const fullRecord = {
      ...record,
      totalClasses: total,
      attendedClasses: attended,
      missedClasses: missed,
      percentage,
      lastUpdated: new Date().toISOString().split("T")[0]
    };

    const idx = (this.state.attendance || []).findIndex(
      a => a.studentId === record.studentId && a.subjectCode === record.subjectCode
    );

    if (idx !== -1) {
      this.state.attendance[idx] = { ...this.state.attendance[idx], ...fullRecord };
    } else {
      this.state.attendance.push(fullRecord);
    }

    this.addAuditLog(
      this.state.session.name,
      this.state.session.role,
      "Attendance Updated",
      `Updated attendance for ${record.studentId} in ${record.subjectCode}: ${percentage}%`
    );
    this.persist();
  }

  // --- Portfolio Builder & Updates ---
  updatePortfolio(studentId, portfolioData) {
    const student = this.getStudentById(studentId);
    if (!student) return false;

    // Merge portfolio attributes
    Object.keys(portfolioData).forEach(key => {
      student[key] = portfolioData[key];
    });

    this.addAuditLog(
      student.name,
      "STUDENT",
      "Portfolio Updated",
      `Updated profile bio, skills, and portfolio showcases`
    );
    this.persist();
    return true;
  }

  addProject(studentId, project) {
    const student = this.getStudentById(studentId);
    if (!student) return;
    if (!student.projects) student.projects = [];
    project.id = "P_" + Date.now();
    student.projects.unshift(project);
    this.addAuditLog(student.name, "STUDENT", "Project Added", `Added new project: ${project.title}`);
    this.persist();
  }

  deleteProject(studentId, projectId) {
    const student = this.getStudentById(studentId);
    if (!student || !student.projects) return;
    student.projects = student.projects.filter(p => p.id !== projectId);
    this.persist();
  }

  addCertification(studentId, cert) {
    const student = this.getStudentById(studentId);
    if (!student) return;
    if (!student.certifications) student.certifications = [];
    cert.id = "C_" + Date.now();
    student.certifications.unshift(cert);
    this.addAuditLog(student.name, "STUDENT", "Certification Added", `Added certification: ${cert.title}`);
    this.persist();
  }

  // --- Announcements ---
  getAnnouncements() {
    return this.state.announcements || [];
  }

  addAnnouncement(announcement) {
    const newAnn = {
      id: "ANN_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      author: this.state.session.name,
      pinned: false,
      ...announcement
    };
    this.state.announcements.unshift(newAnn);
    this.addAuditLog(this.state.session.name, this.state.session.role, "Announcement Created", `Published: ${announcement.title}`);
    this.persist();
    return newAnn;
  }

  // --- Notifications ---
  getNotifications(userId = null) {
    const targetId = userId || this.state.session?.userId;
    return (this.state.notifications || []).filter(n => !n.userId || n.userId === targetId);
  }

  markNotificationAsRead(id) {
    const notif = (this.state.notifications || []).find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.persist();
    }
  }

  markAllNotificationsRead() {
    const targetId = this.state.session?.userId;
    (this.state.notifications || []).forEach(n => {
      if (!n.userId || n.userId === targetId) {
        n.read = true;
      }
    });
    this.persist();
  }

  // --- Audit Logs ---
  getAuditLogs() {
    return (this.state.auditLogs || []).slice(0, 100);
  }

  addAuditLog(user, role, action, details) {
    const log = {
      id: "LOG" + Date.now(),
      timestamp: new Date().toLocaleString("en-US", { hour12: false }),
      user: user || "System",
      role: role || "SYSTEM",
      action,
      details,
      ip: "127.0.0.1 (Local Session)"
    };
    if (!this.state.auditLogs) this.state.auditLogs = [];
    this.state.auditLogs.unshift(log);
    // Keep max 200 logs
    if (this.state.auditLogs.length > 200) {
      this.state.auditLogs.pop();
    }
  }
}

// Global store instance
window.store = new CampusStore();
