/* Shakeer Ahmad — Portfolio */
const EMAILJS_SERVICE = "service_rt2f6h1";
const EMAILJS_TEMPLATE = "template_fauo5dc";
const EMAILJS_KEY = "a4H-VSCPY1gaWM7x2";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.body.classList.add("cursor-custom");
}

const PREFERS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  const visited = sessionStorage.getItem("visited");
  const loadDuration = visited ? 200 : 600;
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        sessionStorage.setItem("visited", "1");
      }, 400);
    }, loadDuration);
  }
  if (typeof emailjs !== "undefined") emailjs.init(EMAILJS_KEY);
});

(function dotCanvas(){
  const canvas = document.getElementById("dot-canvas");
  if (!canvas || PREFERS_REDUCED_MOTION) {
    if (canvas) canvas.style.display = "none";
    return;
  }
  const ctx = canvas.getContext("2d");
  const spacing = 40, radius = 1.1, hoverRadius = 120;
  let mouse = { x: -999, y: -999 }, width, height, dots = [], rafId, running = true;
  function resize(){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];
    for (let y = 0; y <= Math.ceil(height / spacing); y++) {
      for (let x = 0; x <= Math.ceil(width / spacing); x++) dots.push({ x: x * spacing, y: y * spacing });
    }
  }
  function draw(){
    if (!running) return;
    ctx.clearRect(0,0,width,height);
    dots.forEach(dot => {
      const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
      const prox = Math.max(0, 1 - dist / hoverRadius);
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius + prox * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${0.1 + prox * 0.5})`;
      ctx.fill();
    });
    rafId = requestAnimationFrame(draw);
  }
  window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { running = false; cancelAnimationFrame(rafId); }
    else { running = true; draw(); }
  });
  resize(); draw();
})();

(function cursorDot(){
  if (!document.body.classList.contains("cursor-custom")) return;
  const dot = document.getElementById("cursor-dot");
  if (!dot) return;
  document.addEventListener("mousemove", e => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  }, { passive: true });
})();

(function typing(){
  const el = document.getElementById("typed-text");
  const cursorEl = document.getElementById("cursor-blink");
  if (!el) return;
  const text = ">_ SHAKEER AHMAD";
  let i = 0;
  function type(){
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) setTimeout(type, i < 4 ? 110 : 58);
    else if (cursorEl) cursorEl.style.display = "none";
  }
  window.addEventListener("load", () => setTimeout(type, 700));
})();

window.addEventListener("scroll", () => {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;
  const scrolled = document.documentElement.scrollTop;
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0";
}, { passive: true });

(function activeNav(){
  const sections = ["about","skills","projects","experience","certs","contact"];
  const links = document.querySelectorAll(".nav-link");
  const indicator = document.getElementById("nav-indicator");
  const navList = document.getElementById("nav-list");
  function setIndicator(link){
    if (!link || !indicator || !navList) return;
    const nr = navList.getBoundingClientRect();
    const lr = link.parentElement.getBoundingClientRect();
    indicator.style.left = `${lr.left - nr.left}px`;
    indicator.style.width = `${lr.width}px`;
  }
  function onScroll(){
    let current = "";
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section && window.scrollY >= section.offsetTop - 140) current = id;
    });
    links.forEach(link => {
      const active = link.dataset.section === current;
      link.classList.toggle("active", active);
      if (active) setIndicator(link);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  setTimeout(onScroll, 200);
})();

(function revealItems(){
  if (PREFERS_REDUCED_MOTION) {
    document.querySelectorAll(".reveal-item,.timeline-item").forEach(el => el.classList.add("revealed","show"));
    return;
  }
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal-item").forEach(el => revealObserver.observe(el));

  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll(".timeline-item").forEach(item => {
    if (item.getBoundingClientRect().top < window.innerHeight) item.classList.add("show");
    else timelineObserver.observe(item);
  });
})();

function toggleExpand(item){
  const details = item.querySelector(".expandable-details");
  if (!details) return;
  const open = item.classList.contains("open");
  item.classList.toggle("open", !open);
  details.classList.toggle("open", !open);
  item.setAttribute("aria-expanded", String(!open));
}

document.querySelectorAll(".timeline-item.expandable").forEach(item => {
  item.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleExpand(item); }
  });
});

let tState = "normal";
function terminalClose(){ document.getElementById("main-terminal")?.classList.add("closed"); document.getElementById("terminal-restore")?.classList.add("visible"); tState = "closed"; }
function terminalMinimize(){
  const w = document.getElementById("main-terminal");
  if (!w) return;
  if (tState === "minimized") { w.classList.remove("minimized"); tState = "normal"; }
  else { w.classList.remove("maximized"); w.classList.add("minimized"); tState = "minimized"; }
}
function terminalMaximize(){
  const w = document.getElementById("main-terminal");
  if (!w) return;
  if (tState === "maximized") { w.classList.remove("maximized"); document.body.style.overflow = ""; tState = "normal"; }
  else { w.classList.remove("minimized"); w.classList.add("maximized"); document.body.style.overflow = "hidden"; tState = "maximized"; }
}
function terminalRestore(){
  const w = document.getElementById("main-terminal");
  if (!w) return;
  w.classList.remove("closed", "minimized", "maximized");
  document.getElementById("terminal-restore")?.classList.remove("visible");
  document.body.style.overflow = "";
  tState = "normal";
}
document.getElementById("terminal-restore")?.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); terminalRestore(); }
});

(function cmdPalette(){
  const input = document.getElementById("cmd-search");
  const noResults = document.getElementById("cmd-no-results");
  const counter = document.getElementById("cmd-counter");
  const groups = document.querySelectorAll(".cmd-group[data-group]");
  if (!input || !noResults || !counter) return;
  function countVisible(){
    let visible = 0, total = 0;
    document.querySelectorAll(".cmd-row[data-skill]:not(.soon-row)").forEach(row => {
      total++;
      if (row.style.display !== "none") visible++;
    });
    counter.textContent = visible === total ? `${total} SKILLS` : `${visible} / ${total}`;
  }
  setTimeout(countVisible, 100);
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    let anyGroupVisible = false;
    groups.forEach(group => {
      let groupHasMatch = false;
      group.querySelectorAll(".cmd-row[data-skill]").forEach(row => {
        const match = !query || row.dataset.skill.toLowerCase().includes(query);
        row.style.display = match ? "" : "none";
        if (match) groupHasMatch = true;
      });
      group.style.display = groupHasMatch ? "" : "none";
      if (groupHasMatch) anyGroupVisible = true;
    });
    noResults.style.display = anyGroupVisible ? "none" : "block";
    countVisible();
  });
  document.querySelectorAll(".cmd-row[data-skill]:not(.soon-row)").forEach(row => {
    const toggle = () => {
      const expand = row.querySelector(".cmd-expand");
      if (!expand) return;
      const open = row.classList.contains("expanded");
      document.querySelectorAll(".cmd-row.expanded").forEach(r => {
        r.classList.remove("expanded");
        r.querySelector(".cmd-expand")?.classList.remove("open");
      });
      if (!open) { row.classList.add("expanded"); expand.classList.add("open"); }
    };
    row.addEventListener("click", toggle);
    row.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });
})();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => card.classList.toggle("hidden", filter !== "all" && !card.dataset.tags.includes(filter)));
  });
});

function showToast(){
  const toast = document.getElementById("copy-toast");
  if (!toast) return;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}
function copyEmail(e){
  e.preventDefault();
  navigator.clipboard.writeText("ahmad.shakeer.md@gmail.com").then(showToast).catch(() => { window.location.href = "mailto:ahmad.shakeer.md@gmail.com"; });
}
document.getElementById("email-copy-btn")?.addEventListener("click", copyEmail);

function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

function toggleMobileNav(){
  const nav = document.getElementById("mobile-nav");
  const btn = document.getElementById("hamburger");
  if (!nav || !btn) return;
  const isOpen = !nav.classList.contains("open");
  nav.classList.toggle("open", isOpen);
  btn.classList.toggle("open", isOpen);
  btn.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}
function closeMobileNav(){
  document.getElementById("mobile-nav")?.classList.remove("open");
  document.getElementById("hamburger")?.classList.remove("open");
  document.getElementById("hamburger")?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

const PROJECT_DETAILS = {
  d365: {
    title: "DYNAMICS 365 MAIL-TO-TICKET AUTOMATION",
    description: "Mail-to-case automation built with Dynamics 365 Customer Service, Power Automate, and Automatic Record Creation rules for an internal IT support workflow.",
    problem: "Support emails needed a cleaner workflow: case creation, auto-reply, assignment, threaded replies, and closure notifications.",
    metrics: [{ value: "Auto", label: "Case Creation" }, { value: "Threaded", label: "Replies" }, { value: "Flow", label: "Notifications" }],
    items: ["Configured ARC rules to create cases from inbound support emails.", "Built Power Automate flows for auto-replies, assignment support, and closure notifications.", "Worked on email threading so follow-up replies stay connected to the original case.", "Designed a cleaner support workflow for a small internal IT team.", "Prepared guidance for teammates to use the workflow consistently."],
    github: "https://github.com/Sparkeeer"
  },
  cicd: {
    title: "PORTFOLIO CI/CD PIPELINE",
    description: "Static portfolio hosted on AWS S3 and CloudFront with HTTPS and GitHub Actions deployment.",
    problem: "Needed a real cloud operations portfolio that demonstrates secure static hosting, deployment automation, and production-style troubleshooting.",
    metrics: [{ value: "S3", label: "Hosting" }, { value: "OAC", label: "Origin" }, { value: "CI/CD", label: "Deploy" }],
    items: ["Hosted a static site on AWS S3.", "Served the site through CloudFront.", "Used HTTPS with certificate-based setup.", "Configured GitHub Actions for deployment.", "Troubleshot routing, DNS, SSL, and deployment issues."],
    github: "https://github.com/Sparkeeer/portfolio"
  },
  aws: {
    title: "AWS TWO-TIER ARCHITECTURE",
    description: "Two-tier cloud architecture practice project using Flask, MySQL, Docker, Nginx, and AWS networking concepts.",
    problem: "Built to understand separation between application and database tiers, container networking, load balancing, and VPC-level access controls.",
    metrics: [{ value: "2-tier", label: "Architecture" }, { value: "Docker", label: "Runtime" }, { value: "VPC", label: "Network" }],
    items: ["Containerized a Flask app and MySQL database.", "Used Docker Compose for local orchestration.", "Configured Nginx as a reverse proxy / load balancer.", "Mapped the design to AWS VPC, subnet, and security-group concepts.", "Practiced network isolation between application and database layers."],
    github: "https://github.com/Sparkeeer"
  }
};

let lastFocusedElement = null;
function openProject(key){
  const project = PROJECT_DETAILS[key];
  if (!project) return;
  lastFocusedElement = document.activeElement;
  const metricsHTML = project.metrics ? `<div class="modal-metrics">${project.metrics.map(m => `<div class="modal-metric"><div class="modal-metric-value">${m.value}</div><div class="modal-metric-label">${m.label}</div></div>`).join("")}</div>` : "";
  const problemHTML = project.problem ? `<div class="modal-problem"><strong>THE PROBLEM</strong><p>${project.problem}</p></div>` : "";
  document.getElementById("modal-body").innerHTML = `<h3 id="modal-title">${project.title}</h3><p>${project.description}</p>${problemHTML}${metricsHTML}<strong class="modal-section-label">WHAT I BUILT</strong><ul>${project.items.map(item => `<li>${item}</li>`).join("")}</ul>`;
  const gh = document.getElementById("modal-github-link");
  if (gh) { gh.href = project.github || "#"; gh.style.display = project.github ? "inline-flex" : "none"; }
  const modal = document.getElementById("project-modal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => modal.querySelector(".modal-close")?.focus(), 100);
}
function closeProjectModal(){
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) { lastFocusedElement.focus(); lastFocusedElement = null; }
}

document.getElementById("project-modal")?.addEventListener("click", e => {
  if (e.target === e.currentTarget) closeProjectModal();
});
document.getElementById("project-modal")?.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  const modal = e.currentTarget;
  if (!modal.classList.contains("active")) return;
  const focusable = modal.querySelectorAll('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  const modal = document.getElementById("project-modal");
  const mobileNav = document.getElementById("mobile-nav");
  if (modal?.classList.contains("active")) closeProjectModal();
  else if (mobileNav?.classList.contains("open")) closeMobileNav();
  else if (tState === "maximized") terminalMaximize();
});

async function submitContactForm(){
  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const subject = document.getElementById("cf-subject").value.trim();
  const message = document.getElementById("cf-message").value.trim();
  const statusEl = document.getElementById("form-status");
  const btn = document.getElementById("form-submit-btn");
  const btnText = document.getElementById("form-btn-text");
  ["cf-name", "cf-email", "cf-message"].forEach(id => document.getElementById(id).setAttribute("aria-invalid", "false"));
  if (!name || !email || !message) {
    statusEl.textContent = "→ PLEASE FILL IN NAME, EMAIL AND MESSAGE";
    statusEl.className = "form-status err";
    if (!name) document.getElementById("cf-name").setAttribute("aria-invalid", "true");
    if (!email) document.getElementById("cf-email").setAttribute("aria-invalid", "true");
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
    if (typeof emailjs === "undefined") throw new Error("EmailJS not loaded");
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { from_name: name, from_email: email, subject: subject || "Portfolio Contact", message, to_name: "Shakeer" });
    statusEl.textContent = "✓ MESSAGE SENT! I'LL REPLY WITHIN 24 HOURS.";
    statusEl.className = "form-status ok";
    ["cf-name", "cf-email", "cf-subject", "cf-message"].forEach(id => document.getElementById(id).value = "");
  } catch (err) {
    statusEl.textContent = "→ SEND FAILED. EMAIL ME DIRECTLY: ahmad.shakeer.md@gmail.com";
    statusEl.className = "form-status err";
  }
  btn.disabled = false;
  btnText.textContent = "SEND MESSAGE";
}
