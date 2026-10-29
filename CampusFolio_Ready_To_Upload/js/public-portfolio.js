/**
 * CampusFolio - Public Portfolio Renderer
 * Generates an ultra-sleek, recruiter-ready public portfolio for any student.
 * 
 * STRICT PRIVACY GUARANTEE:
 * ONLY student-approved professional showcase information is loaded.
 * Private marks, internal evaluations, attendance logs, phone numbers,
 * and confidential academic records are completely excluded.
 */

document.addEventListener("DOMContentLoaded", () => {
  const store = window.store;
  const urlParams = new URLSearchParams(window.location.search);
  const usnOrSlug = urlParams.get("usn") || urlParams.get("id") || urlParams.get("slug") || "1MS21CS084"; // Default to Shreenidhi N

  let student = store.getStudentBySlug(usnOrSlug) || store.getStudentById(usnOrSlug);
  if (!student) {
    student = store.getStudents()[0]; // Fallback to primary student
  }

  renderPublicPortfolio(student);
});

function renderPublicPortfolio(student) {
  // Page Title
  document.title = `${student.name} — Student Portfolio | CampusFolio`;

  // Apply Theme from store
  const currentTheme = window.store?.getTheme() || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Hero Info
  document.getElementById("pub-avatar").src = student.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80";
  document.getElementById("pub-name").textContent = student.name;
  document.getElementById("pub-tagline").textContent = student.tagline || `Computer Science student passionate about building scalable web systems.`;
  document.getElementById("pub-dept").textContent = `${student.departmentName} &bull; Class of 2025`;
  document.getElementById("pub-bio").textContent = student.bio || "Passionate software engineer building resilient modern web applications and developer tools.";

  // Social Links
  const socials = student.socials || {};
  const socContainer = document.getElementById("pub-socials");
  if (socContainer) {
    let socHtml = "";
    if (socials.github) socHtml += `<a href="${socials.github}" target="_blank" class="pub-soc-btn" title="GitHub"><i class="fab fa-github"></i></a>`;
    if (socials.linkedin) socHtml += `<a href="${socials.linkedin}" target="_blank" class="pub-soc-btn" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>`;
    if (socials.twitter) socHtml += `<a href="${socials.twitter}" target="_blank" class="pub-soc-btn" title="Twitter / X"><i class="fab fa-twitter"></i></a>`;
    if (socials.leetcode) socHtml += `<a href="${socials.leetcode}" target="_blank" class="pub-soc-btn" title="LeetCode"><i class="fas fa-code"></i></a>`;
    socHtml += `<a href="mailto:${student.email}" class="pub-soc-btn" title="Email"><i class="fas fa-envelope"></i></a>`;
    socContainer.innerHTML = socHtml;
  }

  // Resume Download Button
  const resumeBtn = document.getElementById("pub-resume-btn");
  if (resumeBtn) {
    resumeBtn.onclick = () => {
      alert(`Downloading verified resume for ${student.name} (${student.usn})...`);
    };
  }

  // Technical Skills
  const skillsList = student.skills || [];
  const skillsContainer = document.getElementById("pub-skills-grid");
  if (skillsContainer) {
    if (skillsList.length === 0) {
      skillsContainer.innerHTML = `<div style="color: var(--text-muted);">Skills profile under continuous development.</div>`;
    } else {
      skillsContainer.innerHTML = skillsList.map(sk => `
        <div class="pub-skill-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: 700; font-size: 0.95rem;">${sk.name}</span>
            <span class="badge badge-cyan" style="font-size: 0.7rem;">${sk.category || 'Tech'}</span>
          </div>
          <div class="progress-track" style="margin-top: 0; height: 6px;">
            <div class="progress-fill cyan" style="width: ${sk.level || 85}%"></div>
          </div>
        </div>
      `).join("");
    }
  }

  // Projects
  const projectsList = student.projects || [];
  const projectsContainer = document.getElementById("pub-projects-grid");
  if (projectsContainer) {
    if (projectsList.length === 0) {
      projectsContainer.innerHTML = `<div style="color: var(--text-muted); padding: 20px;">No public projects published yet.</div>`;
    } else {
      projectsContainer.innerHTML = projectsList.map(p => `
        <div class="pub-project-card glass-panel">
          <img src="${p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'}" alt="${p.title}" class="pub-project-img">
          <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
            <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">${p.title}</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; flex: 1;">${p.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
              ${(p.technologies || []).map(t => `<span class="badge badge-cyan" style="font-size: 0.72rem;">${t}</span>`).join("")}
            </div>
            <div style="display: flex; gap: 12px;">
              ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-sm btn-secondary"><i class="fab fa-github"></i> Source Code</a>` : ''}
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="btn btn-sm btn-cyan"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
          </div>
        </div>
      `).join("");
    }
  }

  // Internships / Experience
  const internships = student.internships || [];
  const expContainer = document.getElementById("pub-experience-list");
  if (expContainer) {
    if (internships.length === 0) {
      expContainer.innerHTML = `<div style="color: var(--text-muted);">Open to internships & full-time roles starting 2025.</div>`;
    } else {
      expContainer.innerHTML = internships.map(exp => `
        <div class="pub-timeline-item">
          <div class="timeline-dot"></div>
          <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 4px;">${exp.period}</div>
          <h4 style="font-size: 1.15rem; font-weight: 700;">${exp.role}</h4>
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px;">${exp.company}</div>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">${exp.description}</p>
        </div>
      `).join("");
    }
  }

  // Certifications
  const certs = student.certifications || [];
  const certContainer = document.getElementById("pub-certs-grid");
  if (certContainer) {
    if (certs.length === 0) {
      certContainer.innerHTML = `<div style="color: var(--text-muted);">No certifications uploaded.</div>`;
    } else {
      certContainer.innerHTML = certs.map(c => `
        <div class="pub-cert-card">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(6,182,212,0.15); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan); font-size: 1.2rem;">
              <i class="fas fa-award"></i>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${c.title}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">${c.issuer} &bull; ${c.date}</div>
            </div>
          </div>
          ${c.credentialId ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; font-family: var(--font-mono);">Credential ID: ${c.credentialId}</div>` : ''}
        </div>
      `).join("");
    }
  }

  // Achievements
  const achievements = student.achievements || [];
  const achContainer = document.getElementById("pub-achievements-list");
  if (achContainer) {
    if (achievements.length === 0) {
      achContainer.innerHTML = `<div style="color: var(--text-muted);">No awards listed.</div>`;
    } else {
      achContainer.innerHTML = achievements.map(a => `
        <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px; font-size: 0.925rem; color: var(--text-secondary);">
          <i class="fas fa-trophy" style="color: var(--accent-amber); margin-top: 4px;"></i>
          <span>${a}</span>
        </li>
      `).join("");
    }
  }

  // Education Details
  const eduList = student.education || [];
  const eduContainer = document.getElementById("pub-education-list");
  if (eduContainer) {
    eduContainer.innerHTML = eduList.map(edu => `
      <div style="padding: 14px 0; border-bottom: 1px solid var(--border-subtle);">
        <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700;">${edu.period}</div>
        <div style="font-weight: 700; font-size: 1rem;">${edu.degree}</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">${edu.institution}</div>
      </div>
    `).join("");
  }
}
