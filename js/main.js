/* ═══════════════════════════════════════
   Shakeer Ahmad — Portfolio
   Cloud Operations Engineer
═══════════════════════════════════════ */

const GITHUB_USERNAME  = "Sparkeeer";
const EMAILJS_SERVICE  = "service_rt2f6h1";
const EMAILJS_TEMPLATE = "template_fauo5dc";
const EMAILJS_KEY      = "a4H-VSCPY1gaWM7x2";

/* ═══ INIT ═══ */
document.getElementById("year").textContent = new Date().getFullYear();

/* Enable custom cursor only on devices that can hover (desktops) */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.body.classList.add("cursor-custom");
}

/* Respect reduced-motion preference */
const PREFERS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
  const l = document.getElementById("loading-screen");

  /* Skip / shorten loading screen for repeat visitors */
  const visited = sessionStorage.getItem("visited");
  const loadDuration = visited ? 200 : 600;

  setTimeout(() => {
    l.style.opacity = "0";
    setTimeout(() => {
      l.style.display = "none";
      sessionStorage.setItem("visited", "1");
    }, 400);
  }, loadDuration);

  loadGitHubStats();

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_KEY);
  }
});

/* ═══ DOT CANVAS (paused when offscreen / reduced motion) ═══ */
(function(){
  if (PREFERS_REDUCED_MOTION) {
    document.getElementById("dot-canvas").style.display = "none";
    return;
  }

  const canvas = document.getElementById("dot-canvas");
  const ctx = canvas.getContext("2d");
  const S = 40, R = 1.1, H = 120;
  let mouse = { x:-999, y:-999 }, W, H2, dots = [], rafId, running = true;

  function resize(){
    W = canvas.width = window.innerWidth;
    H2 = canvas.height = window.innerHeight;
    build();
  }

  function build(){
    dots = [];
    for (let r = 0; r <= Math.ceil(H2/S); r++) {
      for (let c = 0; c <= Math.ceil(W/S); c++) {
        dots.push({ x: c*S, y: r*S });
      }
    }
  }

  function draw(){
    if (!running) return;
    ctx.clearRect(0, 0, W, H2);

    for (const d of dots) {
      const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
      const prox = Math.max(0, 1 - dist/H);
      ctx.beginPath();
      ctx.arc(d.x, d.y, R + prox*3, 0, Math.PI*2);
      ctx.fillStyle = `rgba(56,189,248,${0.1 + prox*0.5})`;
      ctx.fill();
    }
    rafId = requestAnimationFrame(draw);
  }

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener("resize", resize);

  /* Pause animation when tab is hidden — save battery */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
    } else {
      running = true;
      draw();
    }
  });

  resize();
  draw();
})();

/* ═══ CURSOR DOT (desktop only) ═══ */
(function(){
  if (!document.body.classList.contains("cursor-custom")) return;

  const dot = document.getElementById("cursor-dot");
  document.addEventListener("mousemove", e => {
    dot.style.left = e.clientX + "px";
    dot.style.top  = e.clientY + "px";
  }, { passive: true });
})();

/* ═══ TYPING ═══ */
(function(){
  const el = document.getElementById("typed-text");
  const text = ">_ SHAKEER AHMAD";
  let i = 0;

  function type(){
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) {
      setTimeout(type, i < 4 ? 110 : 58);
    }
  }

  window.addEventListener("load", () => {
    setTimeout(type, 700);
  });
})();

/* ═══ SCROLL PROGRESS ═══ */
window.addEventListener("scroll", () => {
  const s = document.documentElement.scrollTop;
  const t = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("scroll-progress").style.width = `${(s/t)*100}%`;
}, { passive: true });

/* ═══ ACTIVE NAV ═══ */
(function(){
  const SECS = ["about","skills","projects","experience","certs","testimonials","contact"];
  const links = document.querySelectorAll(".nav-link");
  const ind = document.getElementById("nav-indicator");
  const navList = document.getElementById("nav-list");

  function setInd(link){
    if (!link || !ind) return;
    const nr = navList.getBoundingClientRect();
    const lr = link.parentElement.getBoundingClientRect();
    ind.style.left  = `${lr.left - nr.left}px`;
    ind.style.width = `${lr.width}px`;
  }

  function onScroll(){
    let cur = "";
    for (const id of SECS) {
      const s = document.getElementById(id);
      if (s && window.scrollY >= s.offsetTop - 140) cur = id;
    }
    links.forEach(l => {
      const a = l.dataset.section === cur;
      l.classList.toggle("active", a);
      if (a) setInd(l);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  setTimeout(onScroll, 200);
})();

/* ═══ SCROLL REVEAL ═══ */
(function(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12 });

  document.querySelectorAll(".reveal-item").forEach(el => obs.observe(el));
})();

/* ═══ TIMELINE REVEAL ═══ */
window.addEventListener("DOMContentLoaded", () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll(".timeline-item").forEach(item => {
    if (item.getBoundingClientRect().top < window.innerHeight) {
      item.classList.add("show");
    } else {
      obs.observe(item);
    }
  });
});

/* ═══ EXPANDABLE TIMELINE (click + keyboard) ═══ */
function toggleExpand(item){
  const d = item.querySelector(".expandable-details");
  const open = item.classList.contains("open");
  item.classList.toggle("open", !open);
  d.classList.toggle("open", !open);
  item.setAttribute("aria-expanded", String(!open));
}

document.querySelectorAll(".timeline-item.expandable").forEach(item => {
  item.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpand(item);
    }
  });
});

/* ═══ TERMINAL CONTROLS ═══ */
let tState = "normal";

function terminalClose(){
  document.getElementById("main-terminal").classList.add("closed");
  document.getElementById("terminal-restore").classList.add("visible");
  tState = "closed";
}

function terminalMinimize(){
  const w = document.getElementById("main-terminal");
  if (tState === "minimized") {
    w.classList.remove("minimized");
    tState = "normal";
  } else {
    w.classList.remove("maximized");
    w.classList.add("minimized");
    tState = "minimized";
  }
}

function terminalMaximize(){
  const w = document.getElementById("main-terminal");
  if (tState === "maximized") {
    w.classList.remove("maximized");
    document.body.style.overflow = "";
    tState = "normal";
  } else {
    w.classList.remove("minimized");
    w.classList.add("maximized");
    document.body.style.overflow = "hidden";
    tState = "maximized";
  }
}

function terminalRestore(){
  const w = document.getElementById("main-terminal");
  w.classList.remove("closed","minimized","maximized");
  document.getElementById("terminal-restore").classList.remove("visible");
  document.body.style.overflow = "";
  tState = "normal";
}

/* keyboard support for terminal-restore */
document.getElementById("terminal-restore")?.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    terminalRestore();
  }
});

/* ═══ CMD PALETTE / SKILLS ═══ */
(function(){
  const input   = document.getElementById("cmd-search");
  const noRes   = document.getElementById("cmd-no-results");
  const counter = document.getElementById("cmd-counter");
  const groups  = document.querySelectorAll(".cmd-group[data-group]");

  function countVisible(){
    let n = 0, total = 0;
    document.querySelectorAll(".cmd-row[data-skill]:not(.soon-row)").forEach(r => {
      total++;
      if (r.style.display !== "none") n++;
    });
    counter.textContent = n === total ? `${total} SKILLS` : `${n} / ${total}`;
  }

  setTimeout(countVisible, 100);

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let any = false;

    groups.forEach(group => {
      const rows = group.querySelectorAll(".cmd-row[data-skill]");
      let anyMatch = false;

      rows.forEach(row => {
        const match = !q || row.dataset.skill.toLowerCase().includes(q);
        row.style.display = match ? "" : "none";
        if (match) anyMatch = true;
      });

      group.style.display = anyMatch ? "" : "none";
      if (anyMatch) any = true;
    });

    noRes.style.display = any ? "none" : "block";
    countVisible();
  });

  /* Click + keyboard to expand skill row */
  document.querySelectorAll(".cmd-row[data-skill]:not(.soon-row)").forEach(row => {
    const toggle = () => {
      const expand = row.querySelector(".cmd-expand");
      if (!expand) return;
      const open = row.classList.contains("expanded");

      document.querySelectorAll(".cmd-row.expanded").forEach(r => {
        r.classList.remove("expanded");
        r.querySelector(".cmd-expand")?.classList.remove("open");
      });

      if (!open) {
        row.classList.add("expanded");
        expand.classList.add("open");
      }
    };

    row.addEventListener("click", toggle);
    row.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* "/" shortcut to focus search */
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });
})();

/* ═══ PROJECT FILTER ═══ */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    const f = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("hidden", f !== "all" && !card.dataset.tags.includes(f));
    });
  });
});

/* ═══ EMAIL COPY ═══ */
function showToast(){
  const t = document.getElementById("copy-toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function copyEmail(e){
  e.preventDefault();
  navigator.clipboard.writeText("ahmad.shakeer.md@gmail.com")
    .then(showToast)
    .catch(() => {
      window.location.href = "mailto:ahmad.shakeer.md@gmail.com";
    });
}

document.getElementById("email-copy-btn")?.addEventListener("click", copyEmail);

/* ═══ THEME ═══ */
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
});

/* ═══ MOBILE NAV ═══ */
function toggleMobileNav(){
  const nav = document.getElementById("mobile-nav");
  const btn = document.getElementById("hamburger");
  const isOpen = !nav.classList.contains("open");

  nav.classList.toggle("open", isOpen);
  btn.classList.toggle("open", isOpen);
  btn.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeMobileNav(){
  document.getElementById("mobile-nav").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
  document.getElementById("hamburger").setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

/* ═══ PROJECT MODAL ═══ */
const PROJECT_DETAILS = {
  d365: {
    title: "DYNAMICS 365 MAIL-TO-TICKET AUTOMATION",
    description: "End-to-end mail-to-case automation built on Dynamics 365 Customer Service, Power Automate, and Automatic Record Creation (ARC) rules — designed for the internal IT support team at Princeton IT Services.",
    problem: "Before automation: support emails landed in a shared mailbox, were manually triaged, and frequently lost. First-response often took hours. Threading was inconsistent — replies created duplicate cases.",
    metrics: [
      { value: "~80%", label: "Less Manual Work" },
      { value: "<10 min", label: "First Response Time" },
      { value: "Threaded", label: "Mail-to-Case" }
    ],
    items: [
      "Configured Automatic Record Creation (ARC) rules in Dynamics 365 Customer Service to auto-create cases from inbound support emails.",
      "Built Power Automate flows for auto-replies, agent assignment, escalation, and case-closure notifications.",
      "Implemented mail threading so subsequent replies attach to the original case instead of creating duplicates.",
      "Reduced manual ticket creation by ~80% and cut first-response time from hours to under 10 minutes.",
      "Designed dashboards in Dynamics 365 for ticket volume, agent workload, and SLA tracking.",
      "Onboarded teammates with admin access and authored a user guide for the new workflow."
    ],
    github: "https://github.com/Sparkeeer"
  },
  m365ops: {
    title: "M365 OPERATIONS POWERSHELL TOOLKIT",
    description: "A growing library of PowerShell runbooks for daily Microsoft 365 operations — battle-tested across a 50+ user tenant. Built to eliminate repetitive admin work and reduce human error during bulk operations.",
    problem: "Daily M365 admin tasks (license audits, MFA enforcement, mailbox health checks, quarantine triage) were manual and error-prone. Each ticket required clicking through the admin center.",
    metrics: [
      { value: "10+", label: "Runbooks" },
      { value: "Bulk", label: "User Ops" },
      { value: "Audited", label: "Mailbox Health" }
    ],
    items: [
      "Bulk user provisioning + license assignment via Microsoft Graph PowerShell SDK.",
      "MFA enforcement and Conditional Access policy auditing scripts.",
      "Mailbox health reports — quota usage, quarantine status, mail flow stats.",
      "Quarantine triage helper — pull, review, and release messages in bulk.",
      "License optimization — surface unassigned / inactive licenses for cleanup.",
      "Cross-tenant migration helpers used during US → India consolidation."
    ],
    github: "https://github.com/Sparkeeer"
  },
  aws: {
    title: "AWS TWO-TIER ARCHITECTURE",
    description: "Designed and deployed a scalable two-tier architecture on AWS using Flask and MySQL, containerized with Docker and load-balanced via Nginx — built to practice production-grade network isolation patterns.",
    problem: "Learn how production cloud apps separate the application tier from the database tier safely — applied to a hands-on, working deployment rather than just theory.",
    metrics: [
      { value: "Docker Compose", label: "Orchestration" },
      { value: "VPC Isolated", label: "Network Security" },
      { value: "2-Tier", label: "Architecture" }
    ],
    items: [
      "Containerized Flask application and MySQL database using Docker and Docker Compose.",
      "Nginx configured as a reverse proxy and load balancer for the application tier.",
      "Separated application and database layers for security and scalability.",
      "Deployed inside a custom VPC with public and private subnets.",
      "Security groups configured with least-privilege access between tiers."
    ],
    github: "https://github.com/Sparkeeer"
  },
  cicd: {
    title: "PORTFOLIO CI/CD PIPELINE",
    description: "Production-grade static site on AWS S3 + CloudFront with custom domain, HTTPS via ACM, and a fully automated GitHub Actions deployment pipeline. This portfolio itself is the proof of work.",
    problem: "Wanted a real-world demonstration of cloud ops practices — secure origin, scoped IAM, automated deploys, and a custom domain with HTTPS — not just a tutorial copy.",
    metrics: [
      { value: "<60s", label: "Deploy Time" },
      { value: "OAC + ACM", label: "Secure HTTPS" },
      { value: "IAM Scoped", label: "Least Privilege" }
    ],
    items: [
      "Static site hosted on AWS S3, served via CloudFront CDN with Origin Access Control (OAC).",
      "HTTPS enforced via AWS Certificate Manager (ACM) with custom domain routing.",
      "GitHub Actions workflow triggers automatically on every push to main branch.",
      "AWS credentials stored as GitHub Secrets; IAM user has least-privilege S3 write permissions.",
      "DNS, domain routing, and www redirects configured via Cloudflare and Spaceship.",
      "Troubleshot real-world issues: DNS propagation, SSL validation, and access permission mismatches."
    ],
    github: "https://github.com/Sparkeeer/portfolio"
  }
};

let lastFocusedElement = null;

function openProject(key){
  const p = PROJECT_DETAILS[key];
  if (!p) return;

  lastFocusedElement = document.activeElement;

  const metricsHTML = p.metrics
    ? `<div class="modal-metrics">${p.metrics.map(m => `
        <div class="modal-metric">
          <div class="modal-metric-value">${m.value}</div>
          <div class="modal-metric-label">${m.label}</div>
        </div>`).join("")}</div>`
    : "";

  const problemHTML = p.problem
    ? `<div class="modal-problem"><strong>THE PROBLEM</strong><p>${p.problem}</p></div>`
    : "";

  document.getElementById("modal-body").innerHTML =
    `<h3 id="modal-title">${p.title}</h3>
     <p>${p.description}</p>
     ${problemHTML}
     ${metricsHTML}
     <strong class="modal-section-label">WHAT I BUILT</strong>
     <ul>${p.items.map(i => `<li>${i}</li>`).join("")}</ul>`;

  const gh = document.getElementById("modal-github-link");
  gh.href = p.github || "#";
  gh.style.display = p.github ? "inline-flex" : "none";

  const m = document.getElementById("project-modal");
  m.classList.add("active");
  m.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  /* Focus the close button for keyboard users */
  setTimeout(() => m.querySelector(".modal-close")?.focus(), 100);
}

function closeProjectModal(){
  const m = document.getElementById("project-modal");
  m.classList.remove("active");
  m.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  /* Restore focus to whatever opened the modal */
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/* Focus trap inside modal */
document.getElementById("project-modal")?.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;

  const modal = e.currentTarget;
  if (!modal.classList.contains("active")) return;

  const focusable = modal.querySelectorAll('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

/* Escape closes terminal-maximize or modal */
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;

  const modal = document.getElementById("project-modal");
  const mobileNav = document.getElementById("mobile-nav");

  if (modal.classList.contains("active")) {
    closeProjectModal();
  } else if (mobileNav.classList.contains("open")) {
    closeMobileNav();
  } else if (tState === "maximized") {
    terminalMaximize();
  }
});

/* ═══════════════════════════════
   LIVE GITHUB STATS
═══════════════════════════════ */
const LANG_COLORS = {
  "JavaScript":"#f1e05a","Python":"#3572A5","Shell":"#89e051",
  "HTML":"#e34c26","CSS":"#563d7c","TypeScript":"#2b7489",
  "Go":"#00ADD8","Rust":"#dea584","Java":"#b07219",
  "C":"#555555","Dockerfile":"#384d54","PowerShell":"#012456"
};

async function loadGitHubStats(){
  const loadingEl = document.getElementById("github-loading");

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

    const user  = await userRes.json();
    const repos = await reposRes.json();

    loadingEl.style.display = "none";
    document.getElementById("github-stats-grid").style.display = "grid";

    document.getElementById("gh-repos").textContent     = user.public_repos || 0;
    document.getElementById("gh-followers").textContent = user.followers || 0;
    document.getElementById("gh-following").textContent = user.following || 0;

    const stars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
    document.getElementById("gh-stars").textContent = stars;

    const repoList = document.getElementById("github-repos-list");

    repoList.innerHTML = repos
      .filter(r => !r.fork)
      .slice(0, 6)
      .map(r => {
        const langDot = r.language && LANG_COLORS[r.language]
          ? `<span class="repo-lang-dot" style="background:${LANG_COLORS[r.language]}"></span>${r.language}`
          : (r.language || "");

        return `<a class="github-repo-card" href="${r.html_url}" target="_blank" rel="noopener">
          <div class="repo-name"><i class="ri-git-repository-line" aria-hidden="true"></i>${r.name}</div>
          <div class="repo-desc">${r.description || "No description provided."}</div>
          <div class="repo-meta">
            <span><i class="ri-star-line" aria-hidden="true"></i>${r.stargazers_count}</span>
            <span><i class="ri-git-fork-line" aria-hidden="true"></i>${r.forks_count}</span>
            ${langDot ? `<span>${langDot}</span>` : ""}
          </div>
        </a>`;
      })
      .join("");
  } catch (e) {
    loadingEl.innerHTML = `// could not fetch GitHub data — visit <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" style="color:var(--accent)">github.com/${GITHUB_USERNAME}</a>`;
  }
}

/* ═══════════════════════════════
   CONTACT FORM (EmailJS)
═══════════════════════════════ */
async function submitContactForm(){
  const name    = document.getElementById("cf-name").value.trim();
  const email   = document.getElementById("cf-email").value.trim();
  const subject = document.getElementById("cf-subject").value.trim();
  const message = document.getElementById("cf-message").value.trim();

  const statusEl = document.getElementById("form-status");
  const btn      = document.getElementById("form-submit-btn");
  const btnText  = document.getElementById("form-btn-text");

  /* Clear previous error states */
  ["cf-name","cf-email","cf-message"].forEach(id =>
    document.getElementById(id).setAttribute("aria-invalid", "false")
  );

  if (!name || !email || !message) {
    statusEl.textContent = "→ PLEASE FILL IN NAME, EMAIL AND MESSAGE";
    statusEl.className = "form-status err";
    if (!name)    document.getElementById("cf-name").setAttribute("aria-invalid", "true");
    if (!email)   document.getElementById("cf-email").setAttribute("aria-invalid", "true");
    if (!message) document.getElementById("cf-message").setAttribute("aria-invalid", "true");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    statusEl.textContent = "→ INVALID EMAIL FORMAT";
    statusEl.className = "form-status err";
    document.getElementById("cf-email").setAttribute("aria-invalid", "true");
    return;
  }

  btn.disabled = true;
  btnText.textContent = "SENDING";

  try {
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      from_name:  name,
      from_email: email,
      subject:    subject || "Portfolio Contact",
      message,
      to_name:    "Shakeer"
    });

    statusEl.textContent = "✓ MESSAGE SENT! I'LL REPLY WITHIN 24 HOURS.";
    statusEl.className = "form-status ok";

    document.getElementById("cf-name").value = "";
    document.getElementById("cf-email").value = "";
    document.getElementById("cf-subject").value = "";
    document.getElementById("cf-message").value = "";
  } catch (err) {
    statusEl.textContent = "→ SEND FAILED. EMAIL ME DIRECTLY: ahmad.shakeer.md@gmail.com";
    statusEl.className = "form-status err";
  }

  btn.disabled = false;
  btnText.textContent = "SEND MESSAGE";
}