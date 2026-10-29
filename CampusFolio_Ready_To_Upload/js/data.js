/**
 * CampusFolio - Smart Student Academic & Portfolio Management System
 * Seed Data Store
 * Contains realistic data for:
 * - 10 Students (featuring comprehensive profiles, marks, attendance, portfolio items)
 * - 3 Faculty Members (with assigned classes & subjects)
 * - 1 Administrator (Dean of Academics)
 * - Departments, Subjects, Academic Calendar, Announcements, Audit Logs
 */

const INITIAL_DATA = {
  config: {
    systemName: "CampusFolio",
    institutionName: "Apex Institute of Science & Technology",
    universityAffiliation: "Affiliated to State Technological University | NAAC 'A++' Accredited",
    currentAcademicYear: "2025-2026",
    currentSemester: "Even Semester (6th / 4th Sem)",
    attendanceWarningThreshold: 75, // Percentage
    gradingScale: [
      { min: 90, grade: "O", point: 10, label: "Outstanding" },
      { min: 80, grade: "A+", point: 9, label: "Excellent" },
      { min: 70, grade: "A", point: 8, label: "Very Good" },
      { min: 60, grade: "B+", point: 7, label: "Good" },
      { min: 50, grade: "B", point: 6, label: "Above Average" },
      { min: 40, grade: "C", point: 5, label: "Pass" },
      { min: 0, grade: "F", point: 0, label: "Fail" }
    ]
  },

  departments: [
    { id: "CSE", name: "Computer Science & Engineering", code: "CS", hod: "Dr. Arvind Sharma" },
    { id: "AI_DS", name: "Artificial Intelligence & Data Science", code: "AI", hod: "Dr. Meenakshi Sundaram" },
    { id: "ISE", name: "Information Science & Engineering", code: "IS", hod: "Dr. Ramesh Babu" },
    { id: "ECE", name: "Electronics & Communication Engineering", code: "EC", hod: "Prof. Rajesh Kulkarni" },
    { id: "ME", name: "Mechanical Engineering", code: "ME", hod: "Dr. S. K. Narayan" }
  ],

  subjects: [
    { code: "CS601", name: "Full-Stack Web Technologies", dept: "CSE", sem: 6, credits: 4, facultyId: "FAC001", facultyName: "Dr. Arvind Sharma" },
    { code: "CS602", name: "Cloud Computing & DevOps", dept: "CSE", sem: 6, credits: 4, facultyId: "FAC001", facultyName: "Dr. Arvind Sharma" },
    { code: "CS603", name: "Operating Systems & System Architecture", dept: "CSE", sem: 6, credits: 3, facultyId: "FAC002", facultyName: "Dr. Meenakshi Sundaram" },
    { code: "CS604", name: "Computer Networks & Security", dept: "CSE", sem: 6, credits: 4, facultyId: "FAC003", facultyName: "Prof. Rajesh Kulkarni" },
    { code: "CS605", name: "Full-Stack Web Technologies Lab", dept: "CSE", sem: 6, credits: 2, facultyId: "FAC001", facultyName: "Dr. Arvind Sharma" },
    { code: "CS606", name: "Mini Project with Capstone", dept: "CSE", sem: 6, credits: 3, facultyId: "FAC002", facultyName: "Dr. Meenakshi Sundaram" },
    // AI subjects
    { code: "AI401", name: "Machine Learning Foundations", dept: "AI_DS", sem: 4, credits: 4, facultyId: "FAC002", facultyName: "Dr. Meenakshi Sundaram" },
    { code: "AI402", name: "Data Structures and Algorithms in Python", dept: "AI_DS", sem: 4, credits: 4, facultyId: "FAC002", facultyName: "Dr. Meenakshi Sundaram" },
    // ECE subjects
    { code: "EC601", name: "Digital Signal Processing", dept: "ECE", sem: 6, credits: 4, facultyId: "FAC003", facultyName: "Prof. Rajesh Kulkarni" },
    { code: "EC602", name: "Embedded Systems & IoT", dept: "ECE", sem: 6, credits: 4, facultyId: "FAC003", facultyName: "Prof. Rajesh Kulkarni" }
  ],

  faculty: [
    {
      id: "FAC001",
      name: "Dr. Arvind Sharma",
      email: "arvind.sharma@campus.edu",
      phone: "+91 98450 12345",
      designation: "Professor & Head of Department",
      dept: "CSE",
      departmentName: "Computer Science & Engineering",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      assignedSubjects: ["CS601", "CS602", "CS605"],
      bio: "Ph.D. in Distributed Systems with 18+ years of teaching & industrial research experience. Author of 24 international IEEE publications."
    },
    {
      id: "FAC002",
      name: "Dr. Meenakshi Sundaram",
      email: "meenakshi.s@campus.edu",
      phone: "+91 98450 54321",
      designation: "Associate Professor",
      dept: "AI_DS",
      departmentName: "Artificial Intelligence & Data Science",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      assignedSubjects: ["AI401", "AI402", "CS603", "CS606"],
      bio: "Senior AI Researcher specializing in Deep Learning & NLP. Chair of ACM Women in Tech chapter."
    },
    {
      id: "FAC003",
      name: "Prof. Rajesh Kulkarni",
      email: "rajesh.k@campus.edu",
      phone: "+91 98450 67890",
      designation: "Assistant Professor",
      dept: "ECE",
      departmentName: "Electronics & Communication Engineering",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      assignedSubjects: ["EC601", "EC602", "CS604"],
      bio: "Specialist in IoT, Edge Computing and Network Security. Lead faculty for Robotics Club."
    }
  ],

  admin: {
    id: "ADM001",
    name: "Dr. H. V. Ramesh",
    email: "dean.academics@campus.edu",
    phone: "+91 80 2345 6789",
    designation: "Dean of Academic Affairs & Chief Registrar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    office: "Admin Block, Room 102",
    institution: "Apex Institute of Science & Technology"
  },

  students: [
    {
      id: "STD001",
      usn: "1MS21CS084",
      name: "Shreenidhi N",
      email: "shreenidhi.cs21@campus.edu",
      phone: "+91 98765 43210",
      dept: "CSE",
      departmentName: "Computer Science & Engineering",
      sem: 6,
      section: "A",
      cgpa: 9.38,
      sgpa: 9.45,
      totalCredits: 132,
      rank: 2,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "shreenidhi-n",
      bio: "Passionate Full-Stack Developer & Cloud Systems Enthusiast with strong foundations in Data Structures, distributed backends, and modern web architectures. Winner of Smart India Hackathon 2024.",
      tagline: "Building scalable distributed web applications & developer tools.",
      socials: {
        github: "https://github.com/shreenidhi-dev",
        linkedin: "https://linkedin.com/in/shreenidhi-n",
        twitter: "https://twitter.com/shreenidhi_tech",
        leetcode: "https://leetcode.com/shreenidhi_n",
        portfolioUrl: "https://campusfolio.edu/p/shreenidhi-n"
      },
      education: [
        {
          degree: "B.E. in Computer Science & Engineering",
          institution: "Apex Institute of Science & Technology",
          period: "2021 - 2025 (Expected)",
          score: "CGPA: 9.38 / 10.0"
        },
        {
          degree: "Pre-University College (PCMC)",
          institution: "National Public Pre-University College",
          period: "2019 - 2021",
          score: "96.4%"
        },
        {
          degree: "Secondary School Certificate (Class X)",
          institution: "St. Joseph's Boys' High School",
          period: "2019",
          score: "97.2%"
        }
      ],
      skills: [
        { name: "JavaScript / TypeScript", category: "Languages", level: 95 },
        { name: "Python", category: "Languages", level: 90 },
        { name: "Java", category: "Languages", level: 85 },
        { name: "React / Next.js", category: "Frontend", level: 92 },
        { name: "Node.js / Express", category: "Backend", level: 90 },
        { name: "PostgreSQL & Supabase", category: "Databases", level: 88 },
        { name: "Docker & AWS", category: "Cloud & DevOps", level: 80 },
        { name: "Data Structures & Algorithms", category: "Core", level: 92 }
      ],
      projects: [
        {
          id: "P1",
          title: "CampusFolio - Academic & Portfolio Platform",
          description: "Full-stack centralized portal for college students featuring automated marks tracking, attendance shortage alerts, shareable professional portfolio builder, and faculty grading console.",
          technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
          github: "https://github.com/shreenidhi-dev/campusfolio",
          liveUrl: "https://campusfolio-demo.vercel.app",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
          featured: true
        },
        {
          id: "P2",
          title: "PulseGuard - AI Clinical Diagnostic Copilot",
          description: "Healthcare diagnostic platform leveraging machine learning to predict coronary artery disease risk from electronic health records with 94.6% validation accuracy.",
          technologies: ["Python", "PyTorch", "FastAPI", "React", "Docker"],
          github: "https://github.com/shreenidhi-dev/pulseguard-ai",
          liveUrl: "https://pulseguard-health.io",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
          featured: true
        },
        {
          id: "P3",
          title: "Distributed Async Task Queue Engine",
          description: "High-throughput asynchronous job scheduler built with Go and Redis, supporting cron triggers, retry backoffs, dead letter queues, and WebSocket telemetry dashboard.",
          technologies: ["Go", "Redis", "WebSockets", "Prometheus"],
          github: "https://github.com/shreenidhi-dev/task-pulse-go",
          liveUrl: "",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
          featured: false
        }
      ],
      certifications: [
        {
          id: "C1",
          title: "AWS Certified Solutions Architect – Associate",
          issuer: "Amazon Web Services",
          date: "August 2024",
          credentialId: "AWS-PSA-90821",
          verifyUrl: "https://aws.amazon.com/verification"
        },
        {
          id: "C2",
          title: "Meta Front-End Developer Professional Certificate",
          issuer: "Meta (Coursera)",
          date: "March 2024",
          credentialId: "META-FED-8841",
          verifyUrl: "https://coursera.org/verify/meta"
        },
        {
          id: "C3",
          title: "Problem Solving (Advanced) Certificate",
          issuer: "HackerRank",
          date: "January 2024",
          credentialId: "HR-PSA-4412",
          verifyUrl: "https://hackerrank.com/certificates"
        }
      ],
      internships: [
        {
          role: "Software Engineering Intern",
          company: "CloudScale Technologies, Bengaluru",
          period: "June 2024 - August 2024",
          description: "Built microservices in Go & Node.js for client dashboard. Reduced SQL query latency by 42% through connection pooling and Redis caching."
        }
      ],
      achievements: [
        "1st Place Winner - Smart India Hackathon (Ministry of Education, Govt of India) 2024",
        "Knight Badge on LeetCode (Rating: 1980+, 650+ Problems Solved)",
        "Winner - State Level Inter-College Codeathon 2023 (1st out of 180 teams)",
        "Academic Excellence Gold Medalist for 3rd and 4th Semesters"
      ],
      resumeUrl: "https://example.com/resumes/shreenidhi-resume.pdf"
    },
    {
      id: "STD002",
      usn: "1MS21CS002",
      name: "Aarav Patel",
      email: "aarav.p@campus.edu",
      phone: "+91 98765 11002",
      dept: "CSE",
      departmentName: "Computer Science & Engineering",
      sem: 6,
      section: "A",
      cgpa: 8.92,
      sgpa: 9.05,
      totalCredits: 132,
      rank: 7,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "aarav-patel",
      bio: "DevOps & Cloud architecture enthusiast. Focused on Kubernetes, Terraform, and CI/CD pipelines.",
      tagline: "Automating cloud scale and reliable pipelines.",
      skills: [
        { name: "Kubernetes", category: "Cloud", level: 88 },
        { name: "Docker", category: "Cloud", level: 92 },
        { name: "Python", category: "Languages", level: 85 },
        { name: "Go", category: "Languages", level: 78 }
      ],
      projects: [
        {
          id: "P201",
          title: "KubeDeployer - Automated GitOps Engine",
          description: "Zero-downtime canary deployment orchestrator for multi-cluster Kubernetes deployments.",
          technologies: ["Go", "Kubernetes API", "Docker", "GitHub Actions"],
          github: "https://github.com/aarav-devops/kubedeployer",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [
        { id: "C201", title: "Certified Kubernetes Administrator (CKA)", issuer: "Cloud Native Computing Foundation", date: "May 2024" }
      ],
      achievements: ["Runner up at CloudCon Hackathon 2024"]
    },
    {
      id: "STD003",
      usn: "1MS21IS045",
      name: "Priya Sharma",
      email: "priya.sharma@campus.edu",
      phone: "+91 98765 22003",
      dept: "ISE",
      departmentName: "Information Science & Engineering",
      sem: 6,
      section: "B",
      cgpa: 9.15,
      sgpa: 9.20,
      totalCredits: 132,
      rank: 4,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "priya-sharma",
      bio: "Data Analyst & UI/UX Specialist passionate about transforming complex information into intuitive visual experiences.",
      tagline: "Bridging the gap between human intuition and data models.",
      skills: [
        { name: "Figma & UI/UX", category: "Design", level: 96 },
        { name: "React", category: "Frontend", level: 88 },
        { name: "SQL & Tableau", category: "Data", level: 86 }
      ],
      projects: [
        {
          id: "P301",
          title: "EduInsight - Student Analytics Dashboard",
          description: "Visual analytics platform helping teachers identify students at risk of academic drop early.",
          technologies: ["React", "D3.js", "Python FastAPI"],
          github: "https://github.com/priya-design/eduinsight",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [
        { id: "C301", title: "Google Data Analytics Professional Certificate", issuer: "Google", date: "Feb 2024" }
      ],
      achievements: ["Top 3 Finalist - Adobe Design Sprint 2023"]
    },
    {
      id: "STD004",
      usn: "1MS21CS110",
      name: "Rahul Verma",
      email: "rahul.v@campus.edu",
      phone: "+91 98765 33004",
      dept: "CSE",
      departmentName: "Computer Science & Engineering",
      sem: 6,
      section: "A",
      cgpa: 7.42,
      sgpa: 7.30,
      totalCredits: 132,
      rank: 42,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "rahul-verma",
      bio: "Mobile App Developer specializing in Flutter and Android Native development.",
      tagline: "Crafting delightful mobile experiences for iOS and Android.",
      skills: [
        { name: "Flutter & Dart", category: "Mobile", level: 90 },
        { name: "Android / Kotlin", category: "Mobile", level: 82 },
        { name: "Firebase", category: "Backend", level: 85 }
      ],
      projects: [
        {
          id: "P401",
          title: "QuickDrop - Campus Food Ordering App",
          description: "Peer-to-peer campus food pre-ordering app used by 800+ students daily.",
          technologies: ["Flutter", "Firebase", "Stripe API"],
          github: "https://github.com/rahul-flutter/quickdrop",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [],
      achievements: ["Best Campus Startup App - E-Cell Summit 2024"]
    },
    {
      id: "STD005",
      usn: "1MS21AI015",
      name: "Ananya Iyer",
      email: "ananya.iyer@campus.edu",
      phone: "+91 98765 44005",
      dept: "AI_DS",
      departmentName: "Artificial Intelligence & Data Science",
      sem: 4,
      section: "A",
      cgpa: 9.60,
      sgpa: 9.68,
      totalCredits: 88,
      rank: 1,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "ananya-iyer",
      bio: "Machine Learning Researcher working on Computer Vision and Transformer-based audio models.",
      tagline: "Exploring next-generation multimodal foundational models.",
      skills: [
        { name: "PyTorch", category: "AI/ML", level: 95 },
        { name: "Python", category: "Languages", level: 96 },
        { name: "Transformers / HuggingFace", category: "AI/ML", level: 92 },
        { name: "Computer Vision", category: "AI/ML", level: 90 }
      ],
      projects: [
        {
          id: "P501",
          title: "SignVoice - Real-time Indian Sign Language Interpreter",
          description: "Vision-based translator converting real-time Indian Sign Language video feeds into spoken synthetic speech.",
          technologies: ["PyTorch", "OpenCV", "MediaPipe", "Flask"],
          github: "https://github.com/ananya-ai/signvoice",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [
        { id: "C501", title: "Deep Learning Specialization", issuer: "DeepLearning.AI", date: "April 2024" }
      ],
      achievements: ["University Gold Medalist 2023", "Co-author in IEEE Access journal paper"]
    },
    {
      id: "STD006",
      usn: "1MS21EC078",
      name: "Rohan Das",
      email: "rohan.das@campus.edu",
      phone: "+91 98765 55006",
      dept: "ECE",
      departmentName: "Electronics & Communication Engineering",
      sem: 6,
      section: "B",
      cgpa: 8.10,
      sgpa: 8.25,
      totalCredits: 132,
      rank: 15,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "rohan-das",
      bio: "Hardware-Software Co-design, FPGA programming, and Embedded IoT systems enthusiast.",
      tagline: "Connecting silicon to cloud.",
      skills: [
        { name: "Verilog / VHDL", category: "Hardware", level: 86 },
        { name: "Embedded C/C++", category: "Languages", level: 90 },
        { name: "ESP32 & Arduino", category: "IoT", level: 88 }
      ],
      projects: [
        {
          id: "P601",
          title: "SmartFarm - Low-power Mesh Sensor Array",
          description: "Solar-powered LoRa mesh network for automated precision crop irrigation.",
          technologies: ["C++", "FreeRTOS", "LoRaWAN", "PCB Design"],
          github: "https://github.com/rohan-embed/smartfarm",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [
        { id: "C601", title: "Embedded Systems Professional", issuer: "ARM University Program", date: "July 2024" }
      ],
      achievements: ["Lead of University Robotics Rover Team"]
    },
    {
      id: "STD007",
      usn: "1MS21CS142",
      name: "Sneha Kulkarni",
      email: "sneha.k@campus.edu",
      phone: "+91 98765 66007",
      dept: "CSE",
      departmentName: "Computer Science & Engineering",
      sem: 6,
      section: "B",
      cgpa: 8.75,
      sgpa: 8.85,
      totalCredits: 132,
      rank: 9,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "sneha-kulkarni",
      bio: "Cybersecurity Analyst & Ethical Hacker. Focused on Web App Penetration Testing and Network Defense.",
      tagline: "Securing modern cyberspace, one vulnerability at a time.",
      skills: [
        { name: "Ethical Hacking & Burp Suite", category: "Security", level: 90 },
        { name: "Linux Administration", category: "Systems", level: 88 },
        { name: "Network Security", category: "Security", level: 85 }
      ],
      projects: [
        {
          id: "P701",
          title: "Sentinel - Web Vulnerability Scanner",
          description: "Automated reconnaissance tool scanning web endpoints for OWASP Top 10 vulnerabilities.",
          technologies: ["Python", "Docker", "Bash", "SQLite"],
          github: "https://github.com/sneha-sec/sentinel",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [
        { id: "C701", title: "CompTIA Security+", issuer: "CompTIA", date: "Nov 2023" }
      ],
      achievements: ["Top 50 Rank in National CTF 2024"]
    },
    {
      id: "STD008",
      usn: "1MS21ME032",
      name: "Vikram Singh",
      email: "vikram.s@campus.edu",
      phone: "+91 98765 77008",
      dept: "ME",
      departmentName: "Mechanical Engineering",
      sem: 4,
      section: "A",
      cgpa: 7.80,
      sgpa: 7.60,
      totalCredits: 88,
      rank: 22,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "vikram-singh",
      bio: "CAD Designer, 3D Prototyping, and Computational Fluid Dynamics enthusiast with strong passion for Formula Student.",
      tagline: "Innovating mechanics and high-performance automotive chassis.",
      skills: [
        { name: "SolidWorks & CATIA", category: "CAD", level: 94 },
        { name: "ANSYS CFD", category: "Simulation", level: 84 },
        { name: "3D Printing & Fabrication", category: "Hardware", level: 90 }
      ],
      projects: [
        {
          id: "P801",
          title: "Formula Student Aerodynamic Wing Assembly",
          description: "High-downforce multi-element carbon fiber front wing for FSAE race vehicle.",
          technologies: ["SolidWorks", "ANSYS Fluent", "Carbon Fiber Prepreg"],
          github: "",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [
        { id: "C801", title: "Certified SOLIDWORKS Associate (CSWA)", issuer: "Dassault Systèmes", date: "Dec 2023" }
      ],
      achievements: ["Lead Chassis Engineer, Team Apex Racing"]
    },
    {
      id: "STD009",
      usn: "1MS21IS022",
      name: "Divya Nair",
      email: "divya.nair@campus.edu",
      phone: "+91 98765 88009",
      dept: "ISE",
      departmentName: "Information Science & Engineering",
      sem: 6,
      section: "A",
      cgpa: 9.02,
      sgpa: 9.12,
      totalCredits: 132,
      rank: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "divya-nair",
      bio: "Product Engineer & Blockchain Enthusiast. Interested in Web3 decentralized applications and DeFi protocols.",
      tagline: "Building trustless, transparent digital ecosystems.",
      skills: [
        { name: "Solidity", category: "Web3", level: 86 },
        { name: "Ethers.js & React", category: "Frontend", level: 88 },
        { name: "Node.js", category: "Backend", level: 85 }
      ],
      projects: [
        {
          id: "P901",
          title: "TrustCert - Immutable Academic Credential Verification",
          description: "Smart contract system allowing universities to issue verifiable blockchain-signed degrees.",
          technologies: ["Solidity", "Hardhat", "Polygon", "Next.js"],
          github: "https://github.com/divya-web3/trustcert",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [
        { id: "C901", title: "Ethereum Developer Bootcamp", issuer: "Alchemy University", date: "April 2024" }
      ],
      achievements: ["ETHDenver 2024 Track Finalist"]
    },
    {
      id: "STD010",
      usn: "1MS21CS065",
      name: "Karthik Raja",
      email: "karthik.raja@campus.edu",
      phone: "+91 98765 99010",
      dept: "CSE",
      departmentName: "Computer Science & Engineering",
      sem: 6,
      section: "B",
      cgpa: 8.45,
      sgpa: 8.60,
      totalCredits: 132,
      rank: 12,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
      status: "Active",
      portfolioSlug: "karthik-raja",
      bio: "Backend Systems Developer focused on Go, high-throughput microservices, and distributed streaming engines.",
      tagline: "Architecting low-latency backends and real-time streaming engines.",
      skills: [
        { name: "Go (Golang)", category: "Languages", level: 90 },
        { name: "Apache Kafka", category: "Streaming", level: 84 },
        { name: "PostgreSQL", category: "Databases", level: 88 }
      ],
      projects: [
        {
          id: "P1001",
          title: "StreamForge - Event Streaming Gateway",
          description: "Real-time analytics ingestion pipeline processing 20k events/sec.",
          technologies: ["Go", "Kafka", "ClickHouse", "Grafana"],
          github: "https://github.com/karthik-go/streamforge",
          liveUrl: "",
          featured: true
        }
      ],
      certifications: [],
      achievements: ["HackTech 2023 Best Backend Architecture"]
    }
  ],

  // Academic Marks for 6th Semester (Students in CSE)
  // Max marks: IA1 (30), IA2 (30), IA3 (30) -> Best 2 of 3 averaged = 30 max; Assignment (20); Lab/Practical (20 if applicable); SEE (Semester End Exam: 50); Total 100
  marks: [
    // Shreenidhi N (STD001) - 6th Sem
    {
      studentId: "STD001",
      subjectCode: "CS601",
      subjectName: "Full-Stack Web Technologies",
      credits: 4,
      ia1: 29,
      ia2: 30,
      ia3: 28,
      assignment: 19,
      lab: 20,
      see: 47,
      totalMarks: 96,
      grade: "O",
      gradePoint: 10,
      status: "Published",
      publishedBy: "FAC001",
      publishedDate: "2026-05-18",
      feedback: "Exceptional performance in project presentation and architectural design."
    },
    {
      studentId: "STD001",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & DevOps",
      credits: 4,
      ia1: 28,
      ia2: 29,
      ia3: 30,
      assignment: 19,
      lab: null,
      see: 45,
      totalMarks: 94,
      grade: "O",
      gradePoint: 10,
      status: "Published",
      publishedBy: "FAC001",
      publishedDate: "2026-05-18",
      feedback: "Strong hands-on mastery in Kubernetes configuration and Terraform."
    },
    {
      studentId: "STD001",
      subjectCode: "CS603",
      subjectName: "Operating Systems & System Architecture",
      credits: 3,
      ia1: 27,
      ia2: 28,
      ia3: 26,
      assignment: 18,
      lab: null,
      see: 44,
      totalMarks: 90,
      grade: "O",
      gradePoint: 10,
      status: "Published",
      publishedBy: "FAC002",
      publishedDate: "2026-05-19",
      feedback: "Very thorough understanding of kernel scheduling algorithms."
    },
    {
      studentId: "STD001",
      subjectCode: "CS604",
      subjectName: "Computer Networks & Security",
      credits: 4,
      ia1: 29,
      ia2: 27,
      ia3: 29,
      assignment: 18,
      lab: null,
      see: 46,
      totalMarks: 93,
      grade: "O",
      gradePoint: 10,
      status: "Published",
      publishedBy: "FAC003",
      publishedDate: "2026-05-20",
      feedback: "Outstanding analysis on public key cryptography implementations."
    },
    {
      studentId: "STD001",
      subjectCode: "CS605",
      subjectName: "Full-Stack Web Technologies Lab",
      credits: 2,
      ia1: 30,
      ia2: 30,
      ia3: 30,
      assignment: 20,
      lab: 20,
      see: 49,
      totalMarks: 99,
      grade: "O",
      gradePoint: 10,
      status: "Published",
      publishedBy: "FAC001",
      publishedDate: "2026-05-18",
      feedback: "Flawless code quality and clean full-stack deployment."
    },
    {
      studentId: "STD001",
      subjectCode: "CS606",
      subjectName: "Mini Project with Capstone",
      credits: 3,
      ia1: 29,
      ia2: 30,
      ia3: 30,
      assignment: 20,
      lab: null,
      see: 48,
      totalMarks: 98,
      grade: "O",
      gradePoint: 10,
      status: "Published",
      publishedBy: "FAC002",
      publishedDate: "2026-05-19",
      feedback: "Commendable real-world project readiness."
    },

    // Aarav Patel (STD002)
    {
      studentId: "STD002",
      subjectCode: "CS601",
      subjectName: "Full-Stack Web Technologies",
      credits: 4,
      ia1: 26,
      ia2: 27,
      ia3: 28,
      assignment: 18,
      lab: 18,
      see: 43,
      totalMarks: 89,
      grade: "A+",
      gradePoint: 9,
      status: "Published",
      publishedBy: "FAC001",
      publishedDate: "2026-05-18"
    },
    {
      studentId: "STD002",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & DevOps",
      credits: 4,
      ia1: 29,
      ia2: 30,
      ia3: 29,
      assignment: 20,
      lab: null,
      see: 47,
      totalMarks: 96,
      grade: "O",
      gradePoint: 10,
      status: "Published",
      publishedBy: "FAC001",
      publishedDate: "2026-05-18"
    },

    // Rahul Verma (STD004) - Struggles in some subjects
    {
      studentId: "STD004",
      subjectCode: "CS601",
      subjectName: "Full-Stack Web Technologies",
      credits: 4,
      ia1: 21,
      ia2: 22,
      ia3: 20,
      assignment: 15,
      lab: 16,
      see: 34,
      totalMarks: 72,
      grade: "A",
      gradePoint: 8,
      status: "Published",
      publishedBy: "FAC001",
      publishedDate: "2026-05-18"
    },
    {
      studentId: "STD004",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & DevOps",
      credits: 4,
      ia1: 18,
      ia2: 19,
      ia3: 21,
      assignment: 14,
      lab: null,
      see: 31,
      totalMarks: 65,
      grade: "B+",
      gradePoint: 7,
      status: "Published",
      publishedBy: "FAC001",
      publishedDate: "2026-05-18"
    },
    {
      studentId: "STD004",
      subjectCode: "CS603",
      subjectName: "Operating Systems & System Architecture",
      credits: 3,
      ia1: 16,
      ia2: 17,
      ia3: 15,
      assignment: 13,
      lab: null,
      see: 28,
      totalMarks: 58,
      grade: "B",
      gradePoint: 6,
      status: "Published",
      publishedBy: "FAC002",
      publishedDate: "2026-05-19"
    },
    {
      studentId: "STD004",
      subjectCode: "CS604",
      subjectName: "Computer Networks & Security",
      credits: 4,
      ia1: 17,
      ia2: 18,
      ia3: 19,
      assignment: 14,
      lab: null,
      see: 30,
      totalMarks: 63,
      grade: "B+",
      gradePoint: 7,
      status: "Draft", // In Draft mode for faculty testing!
      publishedBy: "FAC003",
      publishedDate: null
    }
  ],

  // Previous Semester SGPA History for Shreenidhi N (STD001) for charts & marks records
  semesterHistory: [
    { sem: 1, sgpa: 9.18, credits: 20, passed: true, examMonth: "Feb 2022" },
    { sem: 2, sgpa: 9.25, credits: 20, passed: true, examMonth: "Aug 2022" },
    { sem: 3, sgpa: 9.42, credits: 24, passed: true, examMonth: "Feb 2023" },
    { sem: 4, sgpa: 9.50, credits: 24, passed: true, examMonth: "Aug 2023" },
    { sem: 5, sgpa: 9.35, credits: 24, passed: true, examMonth: "Jan 2024" },
    { sem: 6, sgpa: 9.45, credits: 20, passed: true, examMonth: "June 2024 (Current)" }
  ],

  // Attendance Records
  attendance: [
    // Shreenidhi N (STD001) - Healthy Attendance
    {
      studentId: "STD001",
      subjectCode: "CS601",
      subjectName: "Full-Stack Web Technologies",
      totalClasses: 48,
      attendedClasses: 44,
      missedClasses: 4,
      percentage: 91.7,
      lastUpdated: "2026-05-22"
    },
    {
      studentId: "STD001",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & DevOps",
      totalClasses: 45,
      attendedClasses: 40,
      missedClasses: 5,
      percentage: 88.9,
      lastUpdated: "2026-05-22"
    },
    {
      studentId: "STD001",
      subjectCode: "CS603",
      subjectName: "Operating Systems & System Architecture",
      totalClasses: 40,
      attendedClasses: 35,
      missedClasses: 5,
      percentage: 87.5,
      lastUpdated: "2026-05-21"
    },
    {
      studentId: "STD001",
      subjectCode: "CS604",
      subjectName: "Computer Networks & Security",
      totalClasses: 46,
      attendedClasses: 39,
      missedClasses: 7,
      percentage: 84.8,
      lastUpdated: "2026-05-22"
    },
    {
      studentId: "STD001",
      subjectCode: "CS605",
      subjectName: "Full-Stack Web Technologies Lab",
      totalClasses: 28,
      attendedClasses: 26,
      missedClasses: 2,
      percentage: 92.9,
      lastUpdated: "2026-05-20"
    },

    // Rahul Verma (STD004) - Warning Level Attendance!
    {
      studentId: "STD004",
      subjectCode: "CS601",
      subjectName: "Full-Stack Web Technologies",
      totalClasses: 48,
      attendedClasses: 35,
      missedClasses: 13,
      percentage: 72.9, // SHORTAGE ALERT (< 75%)
      lastUpdated: "2026-05-22"
    },
    {
      studentId: "STD004",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & DevOps",
      totalClasses: 45,
      attendedClasses: 31,
      missedClasses: 14,
      percentage: 68.8, // SHORTAGE ALERT (< 75%)
      lastUpdated: "2026-05-22"
    },
    {
      studentId: "STD004",
      subjectCode: "CS603",
      subjectName: "Operating Systems",
      totalClasses: 40,
      attendedClasses: 29,
      missedClasses: 11,
      percentage: 72.5, // SHORTAGE ALERT (< 75%)
      lastUpdated: "2026-05-21"
    },
    {
      studentId: "STD004",
      subjectCode: "CS604",
      subjectName: "Computer Networks",
      totalClasses: 46,
      attendedClasses: 33,
      missedClasses: 13,
      percentage: 71.7, // SHORTAGE ALERT (< 75%)
      lastUpdated: "2026-05-22"
    },

    // Aarav Patel (STD002)
    {
      studentId: "STD002",
      subjectCode: "CS601",
      subjectName: "Full-Stack Web Technologies",
      totalClasses: 48,
      attendedClasses: 41,
      missedClasses: 7,
      percentage: 85.4,
      lastUpdated: "2026-05-22"
    },
    {
      studentId: "STD002",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & DevOps",
      totalClasses: 45,
      attendedClasses: 43,
      missedClasses: 2,
      percentage: 95.5,
      lastUpdated: "2026-05-22"
    }
  ],

  // College Announcements & Notifications
  announcements: [
    {
      id: "ANN001",
      title: "Semester End Examinations (SEE) Schedule - Even Sem 2026",
      category: "Examinations",
      author: "Dean of Academic Affairs",
      date: "2026-05-20",
      pinned: true,
      content: "The final timetable for the 6th and 4th semester examinations has been published. Theory exams will commence from June 10, 2026. Hall tickets can be downloaded from the student portal starting June 2nd provided attendance requirements are met (min 75%)."
    },
    {
      id: "ANN002",
      title: "Campus Placement Drive: Google, Microsoft & Atlassian",
      category: "Placements",
      author: "Head of Training & Placement Cell",
      date: "2026-05-18",
      pinned: true,
      content: "Upcoming Tier-1 campus hiring for 2025 batch. Eligible branches: CSE, ISE, AI&DS, ECE. Minimum CGPA requirement: 7.50 with no active backlogs. Please ensure your CampusFolio public portfolio is updated and your verified resume is uploaded before May 28."
    },
    {
      id: "ANN003",
      title: "HackApex 2026 - 36-Hour National Inter-College Hackathon",
      category: "Events",
      author: "Department of CSE",
      date: "2026-05-15",
      pinned: false,
      content: "Registration is open for HackApex 2026 with a cash prize pool of INR 3,00,000! Tracks include AI for Healthcare, FinTech, Web3, and Sustainable Smart Cities. Teams of 3-4 can register via the portal."
    },
    {
      id: "ANN004",
      title: "Faculty Reminder: Internal Assessment 3 Marks Submission Deadline",
      category: "Academic",
      author: "Controller of Examinations",
      date: "2026-05-12",
      pinned: false,
      content: "All subject faculties are requested to enter and publish IA-3 scores and finalize laboratory continuous evaluation marks before May 25, 2026 5:00 PM."
    }
  ],

  // Academic Calendar & Timetable
  calendarEvents: [
    { id: "E1", title: "Web Tech Lab SEE Exam", date: "2026-06-02", type: "Exam", time: "09:30 AM - 12:30 PM", location: "Lab 3, CS Block" },
    { id: "E2", title: "Mini Project Final Review", date: "2026-06-05", type: "Submission", time: "02:00 PM - 05:00 PM", location: "Seminar Hall 2" },
    { id: "E3", title: "Last Working Day (Even Sem)", date: "2026-06-06", type: "Milestone", time: "Full Day", location: "Campus-wide" },
    { id: "E4", title: "Theory Exam: CS601 Web Technologies", date: "2026-06-10", type: "Exam", time: "02:00 PM - 05:00 PM", location: "Hall A-101" },
    { id: "E5", title: "Theory Exam: CS602 Cloud Computing", date: "2026-06-13", type: "Exam", time: "02:00 PM - 05:00 PM", location: "Hall A-101" },
    { id: "E6", title: "Theory Exam: CS603 Operating Systems", date: "2026-06-16", type: "Exam", time: "02:00 PM - 05:00 PM", location: "Hall A-102" },
    { id: "E7", title: "Theory Exam: CS604 Computer Networks", date: "2026-06-19", type: "Exam", time: "02:00 PM - 05:00 PM", location: "Hall A-101" }
  ],

  // Notifications (User-specific)
  notifications: [
    { id: "N1", userId: "STD001", title: "Marks Published", message: "Dr. Arvind Sharma published your CS601 Full-Stack Web Technologies marks. Grade: O (96/100).", time: "2 hours ago", read: false, icon: "award" },
    { id: "N2", userId: "STD001", title: "Attendance Logged", message: "CS602 Cloud Computing attendance updated. Current: 88.9%.", time: "5 hours ago", read: false, icon: "check-circle" },
    { id: "N3", userId: "STD001", title: "Placement Alert", message: "Microsoft software engineer intern shortlisted applicants announced. Check email.", time: "1 day ago", read: true, icon: "briefcase" },
    { id: "N4", userId: "STD004", title: "Attendance Warning!", message: "Your attendance in CS602 is 68.8% (below 75% threshold). Contact faculty immediately.", time: "3 hours ago", read: false, icon: "alert-triangle" }
  ],

  // System Audit Logs (Security & Transparency Requirement)
  auditLogs: [
    { id: "LOG001", timestamp: "2026-05-22 10:45:12", user: "Dr. Arvind Sharma (Faculty)", role: "FACULTY", action: "Published Marks", details: "Published final marks for CS601 Web Technologies (CSE Sem 6 - 54 students)", ip: "192.168.1.45" },
    { id: "LOG002", timestamp: "2026-05-21 16:30:00", user: "Dr. H. V. Ramesh (Admin)", role: "ADMIN", action: "Policy Update", details: "Confirmed attendance minimum threshold at 75% for Even Sem 2026 hall ticket eligibility", ip: "192.168.1.10" },
    { id: "LOG003", timestamp: "2026-05-21 14:15:22", user: "Dr. Meenakshi Sundaram (Faculty)", role: "FACULTY", action: "Attendance Recorded", details: "Logged attendance for AI401 Machine Learning Foundations (Lecture #42)", ip: "192.168.1.52" },
    { id: "LOG004", timestamp: "2026-05-20 11:20:44", user: "Shreenidhi N (Student)", role: "STUDENT", action: "Portfolio Updated", details: "Added PulseGuard AI project and updated GitHub repository link", ip: "10.0.4.11" },
    { id: "LOG005", timestamp: "2026-05-19 09:12:08", user: "Dr. H. V. Ramesh (Admin)", role: "ADMIN", action: "Published Announcement", details: "Published 'Semester End Examinations (SEE) Schedule'", ip: "192.168.1.10" }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.CAMPUS_SEED = INITIAL_DATA;
}
