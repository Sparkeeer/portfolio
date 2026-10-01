/* ═══ CONFIG — edit these ═══ */
const EMAILJS_SERVICE  = "service_rt2f6h1";
const EMAILJS_TEMPLATE = "template_fauo5dc";
const EMAILJS_KEY      = "a4H-VSCPY1gaWM7x2";
const EMAIL            = "ahmad.shakeer.md@gmail.com";
const LINKEDIN         = "https://linkedin.com/in/shakeerahmad05";
const GITHUB           = "https://github.com/Sparkeeer";
const JOB_START        = new Date("2025-10-01");
const HELLOS = [["Hi","English"], ["నమస్తే","Telugu"], ["नमस्ते","Hindi"], ["آداب","Urdu"]];

const $ = id => document.getElementById(id);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
$("year").textContent = new Date().getFullYear();

/* ═══ Background: spiral + leaves ═══ */
(function(){
  let d = "";
  for (let i = 0; i < 1400; i += 3) {
    const t = i / 1400 * 14 * Math.PI, r = 6 + t * 5.2;
    d += (i ? " L" : "M") + (200 + r * Math.cos(t)).toFixed(1) + " " + (200 + r * Math.sin(t)).toFixed(1);
  }
  $("spiral-path").setAttribute("d", d);

  const leaf = '<svg viewBox="0 0 24 24"><path class="lf" d="M12 2C6 6 4 12 6 18c1.5 1.8 3.8 2.6 6 2.6s4.5-.8 6-2.6C20 12 18 6 12 2z"/><path class="vein" d="M12 5v17M12 10l-3-2M12 10l3-2M12 14l-3.5-2M12 14l3.5-2"/></svg>';
  const spots = [[8,26,-2,14],[22,34,-15,10],[41,30,-8,14],[58,38,-22,11],[73,28,-12,14],[86,36,-28,9],[95,32,-5,12]];
  $("leaves").innerHTML = spots.map(([l, dur, del, s]) =>
    `<i style="left:${l}%;width:${s}px;height:${s}px;animation-duration:${dur}s;animation-delay:${del}s">${leaf}</i>`).join("");
})();
document.addEventListener("visibilitychange", () => {
  document.querySelector(".page-bg").style.display = document.hidden ? "none" : "";
});

/* ═══ TOAST ═══ */
function toast(msg){
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ═══ SCROLL PROGRESS ═══ */
const bar = $("scroll-progress");
function updateProgress(){
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

/* ═══ THEME (dark by default) ═══ */
function toggleTheme(){
  const dark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
  toast(`PS> Set-Theme -Mode ${dark ? "Dark" : "Light"}  `);
  return dark;
}
$("theme-btn").addEventListener("click", toggleTheme);

/* ═══ NAV ═══ */
const nav = $("nav"), links = $("nav-links"), menuBtn = $("menu-btn");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });
function setMenu(open){
  links.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = open ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
}
menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

const navMap = {};
links.querySelectorAll("a").forEach(a => navMap[a.getAttribute("href").slice(1)] = a);
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && navMap[e.target.id]) {
      Object.values(navMap).forEach(a => a.classList.remove("active"));
      navMap[e.target.id].classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => sectionObs.observe(s));
function go(sel){ document.querySelector(sel)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: sel === "#cli" ? "center" : "start" }); }

/* ═══ Text decode effect ═══ */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/#$%&*";
function decode(el, duration = 900){
  const final = el.dataset.text || el.textContent;
  if (reduceMotion) { el.textContent = final; return; }
  const start = performance.now();
  (function frame(now){
    const p = Math.min(1, (now - start) / duration);
    const shown = Math.floor(p * final.length);
    el.textContent = final.split("").map((ch, i) =>
      i < shown || ch === " " || ch === "." ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");
    if (p < 1) requestAnimationFrame(frame); else el.textContent = final;
  })(start);
}
document.querySelectorAll(".scramble").forEach(el => setTimeout(() => decode(el, 1000), 250));

/* ═══ MULTILINGUAL HELLO ═══ */
(function(){
  const el = $("hello");
  const setTip = i => el.dataset.tip = `"${HELLOS[i][0]}" — ${HELLOS[i][1]}. I speak all four.`;
  setTip(0);
  if (reduceMotion) return;
  let i = 0;
  setInterval(() => {
    el.classList.add("swap");
    setTimeout(() => {
      i = (i + 1) % HELLOS.length;
      el.textContent = HELLOS[i][0];
      setTip(i);
      el.classList.remove("swap");
    }, 350);
  }, 2400);
})();

/* ═══ "Open to roles" — inline pills ═══ */
(function(){
  const btn = $("status-btn"), pop = $("status-pop");
  btn.addEventListener("click", () => {
    const open = pop.hidden;
    pop.hidden = !open;
    btn.setAttribute("aria-expanded", open);
  });
})();

/* ═══ TENURE ═══ */
(function(){
  const now = new Date();
  const months = (now.getFullYear() - JOB_START.getFullYear()) * 12 + (now.getMonth() - JOB_START.getMonth()) + 1;
  const y = Math.floor(months / 12), m = months % 12;
  $("tenure").textContent = [y ? `${y} yr` : "", m ? `${m} mo` : ""].filter(Boolean).join(" ") || "1 mo";
})();

/* ═══ LAST UPDATED ═══ */
(function(){
  const d = new Date(document.lastModified);
  $("last-updated").textContent = isNaN(d) ? "recently" : d.toLocaleDateString("en-GB", {month: "short", year: "numeric" });
})();

/* ═══ REVEAL + heading decode + flow ═══ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    el.querySelector(".flow")?.classList.add("run");
    if (el.matches("h2") && !el.dataset.done) { el.dataset.done = 1; }
    revealObs.unobserve(el);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".card, main h2").forEach(el => {
  if (!el.matches("h2")) el.classList.add("reveal");
  revealObs.observe(el);
});

/* ═══ Cursor spotlight — desktop only ═══ */
(function(){
  if (reduceMotion || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const root = document.documentElement; let raf;
  window.addEventListener("pointermove", e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
      root.classList.add("spot-on");
    });
  }, { passive: true });
  document.addEventListener("pointerleave", () => root.classList.remove("spot-on"));
})();

/* ═══ COPY EMAIL ═══ */
function copyEmail(){
  navigator.clipboard.writeText(EMAIL).then(() => toast("Copied — no phishing, I promise"), () => location.href = `mailto:${EMAIL}`);
}
$("copy-email").addEventListener("click", copyEmail);

/* ═══════════ MINI TERMINAL ═══════════ */
const cliOut = $("cli-out"), cliInput = $("cli-input");
const cmdHistory = []; let hIdx = 0, cliBusy = false;
const sleep = ms => new Promise(r => setTimeout(r, reduceMotion ? 0 : ms));
const esc = s => s.replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
function out(html){ cliOut.insertAdjacentHTML("beforeend", html + "\n"); cliOut.scrollTop = cliOut.scrollHeight; }
function echo(cmd){ out(`<span class="p">$</span> ${esc(cmd)}`); }

const COMMANDS = {
  help: { desc: "list commands", run: () => out(
    Object.entries(COMMANDS).filter(([, c]) => !c.hidden)
      .map(([k, c]) => `  <b>${k.padEnd(18)}</b><span class="dim">${c.desc}</span>`).join("\n")) },
  whoami: { desc: "who I am, in one line", run: () => out("Shakeer Ahmad — Microsoft 365 &amp; Cloud Engineer at Princeton IT Services.\n<span class=\"dim\">Identity, mail, migrations, automation. Working toward AZ-104.</span>") },
  skills: { desc: "what I work with", run: () => out([
    "<b>M365</b>       Exchange Online · SharePoint · OneDrive · Teams · Dynamics 365",
    "<b>Identity</b>   Entra ID · Conditional Access · MFA · RBAC · Intune",
    "<b>Migration</b>  Cross-tenant · Google Workspace → M365 · MX/SPF/DKIM",
    "<b>Automate</b>   PowerShell · Power Automate · Copilot Studio · GitHub Actions",
    "<b>Cloud</b>      Azure (AZ-104 labs) · AWS S3 / CloudFront / IAM",
  ].join("\n")) },
  projects: { desc: "things I've built", run: () => { out([
    "<span class=\"ok\"></span> Mail-to-Ticket System     <span class=\"dim\">~80% less manual work</span>",
    "  Cross-Tenant Migrations   <span class=\"dim\">3+ tenants, zero data loss</span>",
    "  Google Workspace → M365   <span class=\"dim\">40 users</span>",
    "  Princeton Engage bot      <span class=\"dim\">birthdays &amp; anniversaries</span>",
    "  This site                 <span class=\"dim\">S3 + CloudFront + GitHub Actions</span>",
  ].join("\n")); setTimeout(() => go("#projects"), 900); } },
  certs: { desc: "certifications", run: () => out("<span class=\"ok\">✓</span> AZ-900  Azure Fundamentals\n<span class=\"dim\">…</span> AZ-104  Azure Administrator <span class=\"dim\">(in progress)</span>") },
  contact: { desc: "how to reach me", run: () => out(`<b>email</b>     <a href="mailto:${EMAIL}">${EMAIL}</a>\n<b>linkedin</b>  <a href="${LINKEDIN}" target="_blank" rel="noopener">${LINKEDIN.replace("https://", "")}</a>\n<b>github</b>    <a href="${GITHUB}" target="_blank" rel="noopener">${GITHUB.replace("https://", "")}</a>`) },
  resume: { desc: "open my resume", run: () => { out("Opening resume.pdf…"); window.open("./assets/resume.pdf", "_blank"); } },
  theme: { desc: "toggle dark / light", run: () => { const d = toggleTheme(); out(`<span class="ok">✓</span> Theme set to ${d ? "Dark" : "Light"}`); } },
  "sudo hire shakeer": { desc: "you know you want to ", run: sudoHire },
  clear: { desc: "clear the screen", run: () => { cliOut.innerHTML = ""; } },
  /* hidden extras */
  troublesome: { hidden: true, run: () => out('<span class="leaf">"What a drag…" — but I automated it anyway.</span>') },
  shikamaru:   { hidden: true, run: () => out('<span class="leaf">He wanted to be a cloud. I manage them instead.</span>') },
  clouds:      { hidden: true, run: () => out('<span class="dim">Watching clouds…</span>\n<span class="dim">Azure: in progress · AWS: this site · M365: every day</span>') },
  dattebayo:   { hidden: true, run: () => out('<span class="leaf">Never giving up on a ticket — that\'s my ninja way.</span>') },
  "believe it":{ hidden: true, run: () => out('<span class="leaf">Believe it! Now go check the projects.</span>') },
  ls:   { hidden: true, run: () => out("about  skills  experience  projects  certs  contact") },
  pwd:  { hidden: true, run: () => out("/home/shakeer/portfolio") },
  date: { hidden: true, run: () => out(new Date().toString()) },
  sudo: { hidden: true, run: () => out("<span class=\"dim\">sudo: what should I run? Try</span> <b>sudo hire shakeer</b>") },
  exit: { hidden: true, run: () => out("<span class=\"dim\">Nice try — there's no leaving. Scroll down </span>") },
};

async function sudoHire(){
  cliBusy = true;
  out('<span class="dim">[sudo] checking permissions…</span>');           await sleep(600);
  out('<span class="dim">Verifying candidate: Microsoft 365 &amp; Cloud Engineer</span>'); await sleep(550);
  out('<span class="dim">Loading: Entra ID · Exchange Online · migrations · automation</span>'); await sleep(650);
  out('<span class="ok">Access granted ✓</span>');                         await sleep(350);
  out('Opening contact form…<span class="cur"></span>');                   await sleep(1000);
  cliOut.querySelector(".cur")?.remove();
  cliBusy = false;
  go("#contact");
  const subj = $("cf-subject"); if (!subj.value) subj.value = "a job opportunity";
  setTimeout(() => $("cf-name").focus({ preventScroll: true }), 700);
}

async function runCommand(raw){
  const cmd = raw.trim().replace(/\s+/g, " ");
  if (!cmd || cliBusy) return;
  cmdHistory.push(cmd); hIdx = cmdHistory.length;
  echo(cmd);
  const key = cmd.toLowerCase();
  if (COMMANDS[key]) return COMMANDS[key].run();
  if (key.startsWith("echo ")) return out(esc(cmd.slice(5)));
  if (key.startsWith("sudo ")) return out(`<span class="err">Permission denied.</span> <span class="dim">Only</span> <b>sudo hire shakeer</b> <span class="dim">is allowed here </span>`);
  out(`<span class="err">command not found:</span> ${esc(cmd)} <span class="dim">— try</span> <b>help</b>`);
}

$("cli-form").addEventListener("submit", e => { e.preventDefault(); runCommand(cliInput.value); cliInput.value = ""; });
cliInput.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && cmdHistory.length) { e.preventDefault(); hIdx = Math.max(0, hIdx - 1); cliInput.value = cmdHistory[hIdx]; }
  else if (e.key === "ArrowDown" && cmdHistory.length) { e.preventDefault(); hIdx = Math.min(cmdHistory.length, hIdx + 1); cliInput.value = cmdHistory[hIdx] || ""; }
  else if (e.key === "Tab") {
    const v = cliInput.value.toLowerCase();
    const match = v && Object.keys(COMMANDS).find(k => !COMMANDS[k].hidden && k.startsWith(v));
    if (match) { e.preventDefault(); cliInput.value = match; }
  }
});
$("cli-sugs").addEventListener("click", async e => {
  const b = e.target.closest("button"); if (!b || cliBusy) return;
  cliInput.value = "";
  for (const ch of b.textContent) { cliInput.value += ch; await sleep(28); }
  await sleep(120);
  runCommand(cliInput.value);
  cliInput.value = "";
});
$("cli").addEventListener("click", e => { if (!e.target.closest("button, a")) cliInput.focus({ preventScroll: true }); });

/* ═══ Skills: skill → real usage popovers (edit to match your real work) ═══ */
const SKILLS = {
  "Exchange Online": { d: "Microsoft's cloud email service.", u: ["Mailbox provisioning", "Shared mailboxes & Send-As", "Quarantine management", "Mail flow during migrations"], p: ["Mail-to-Ticket System", "Cross-Tenant Migrations", "Google Workspace → M365"] },
  "SharePoint Online": { d: "Team sites, documents and lists.", u: ["Tenant-to-tenant content moves", "Lists as a data source for flows"], p: ["Cross-Tenant Migrations", "Princeton Engage"] },
  "OneDrive": { d: "Personal cloud file storage for each user.", u: ["Moving user files between tenants", "Landing Google Drive data"], p: ["Cross-Tenant Migrations", "Google Workspace → M365"] },
  "Teams": { d: "Chat, meetings and collaboration.", u: ["Automated announcements", "Hosting a Copilot Studio bot"], p: ["Princeton Engage"] },
  "M365 Admin Center": { d: "Main portal for users, licences and settings.", u: ["User & licence management", "Onboarding and offboarding"] },
  "Dynamics 365 Customer Service": { d: "Case / ticket management for support teams.", u: ["Automatic Record Creation (ARC) rules", "Case routing & acknowledgements"], p: ["Mail-to-Ticket System"] },
  "Entra ID": { d: "Identity & access management (formerly Azure AD).", u: ["MFA enforcement", "RBAC roles", "Conditional Access", "Access reviews"], p: ["Cross-Tenant Migrations"] },
  "Conditional Access": { d: "Sign-in rules based on user, device and risk.", u: ["Requiring MFA for sign-ins", "Protecting 50+ user accounts"] },
  "MFA": { d: "A second proof of identity beyond the password.", u: ["Enforcing MFA for all users"] },
  "RBAC": { d: "Give people only the permissions their role needs.", u: ["Assigning admin roles in Entra ID", "Least-privilege IAM for this site's deploys"], p: ["This Site — CI/CD"] },
  "Intune": { d: "Device management and compliance.", u: ["Device policies and compliance"] },
  "Access reviews": { d: "Periodic checks that access is still needed.", u: ["Quarterly access reviews"] },
  "Cross-tenant migration": { d: "Moving users, mail and files between M365 organisations.", u: ["Pre-sync, cutover & delta sync", "US-to-India tenant moves for compliance"], p: ["Cross-Tenant Migrations"] },
  "Google Workspace → M365": { d: "Moving from Google to Microsoft 365.", u: ["Gmail, Calendar & Contacts to Exchange", "Drive to OneDrive / SharePoint"], p: ["Google Workspace → M365"] },
  "AvePoint Fly": { d: "Third-party M365 migration tool.", u: ["Tenant-to-tenant migrations"], p: ["Cross-Tenant Migrations"] },
  "MX / SPF / DKIM": { d: "DNS records for mail routing and anti-spoofing.", u: ["Updating records during domain transfer", "Keeping mail flowing at cutover"], p: ["Cross-Tenant Migrations", "Google Workspace → M365"] },
  "DNS cutovers": { d: "Switching DNS so traffic or mail moves to the new system.", u: ["Migration cutovers", "Custom domain for this site"], p: ["Cross-Tenant Migrations", "This Site — CI/CD"] },
  "PowerShell": { d: "Microsoft's scripting shell for admin automation.", u: ["Bulk admin tasks in M365"] },
  "Power Automate": { d: "Low-code workflows — 'when X happens, do Y'.", u: ["Case routing & auto-replies", "Scheduled daily flows", "Teams posts & HTML emails"], p: ["Mail-to-Ticket System", "Princeton Engage"] },
  "Copilot Studio": { d: "Microsoft's tool for building bots and agents.", u: ["Internal Teams bot answering milestone questions"], p: ["Princeton Engage"] },
  "GitHub Actions": { d: "Automation that runs on every code push.", u: ["Auto-deploying this site to S3 + CloudFront"], p: ["This Site — CI/CD"] },
  "Python": { d: "General-purpose programming language.", u: ["Scripting and small utilities"] },
  "Bash": { d: "Linux command-line shell.", u: ["Command-line work on Linux"] },
  "Virtual Machines": { d: "Cloud-hosted computers on demand.", u: ["AZ-104 hands-on labs"] },
  "Availability sets & zones": { d: "Spreading VMs to survive hardware or datacenter failures.", u: ["AZ-104 hands-on labs"] },
  "Scale sets": { d: "Identical VMs that grow or shrink with load.", u: ["AZ-104 hands-on labs"] },
  "App Service": { d: "Azure's managed web app hosting.", u: ["AZ-104 hands-on labs"] },
  "AZ-104 labs": { d: "Practice for the Azure Administrator certification.", u: ["VMs, availability, scale sets, App Service"] },
  "S3": { d: "AWS object storage.", u: ["Hosting this site's files (private bucket)"], p: ["This Site — CI/CD"] },
  "CloudFront": { d: "AWS's CDN.", u: ["Serving this site over HTTPS", "Origin Access Control"], p: ["This Site — CI/CD"] },
  "IAM": { d: "Who (or what) can do what in AWS.", u: ["Least-privilege deploy user"], p: ["This Site — CI/CD"] },
  "ACM": { d: "Free TLS certificates on AWS.", u: ["HTTPS for shakeer.space"], p: ["This Site — CI/CD"] },
  "Route 53": { d: "AWS's DNS service.", u: ["DNS for this site"], p: ["This Site — CI/CD"] },
};
(function(){
  const pop = document.createElement("div");
  pop.className = "skill-pop"; pop.setAttribute("role", "tooltip");
  document.body.appendChild(pop);
  const escH = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  function show(li){
    const name = li.textContent.trim(), s = SKILLS[name]; if (!s) return;
    pop.innerHTML =
      `<h4>${escH(name)}</h4><p class="sp-desc">${escH(s.d)}</p>` +
      (s.u?.length ? `<p class="sp-lbl">Used for</p><ul class="used">${s.u.map(x => `<li>${escH(x)}</li>`).join("")}</ul>` : "") +
      (s.p?.length ? `<p class="sp-lbl">Projects</p><ul class="proj">${s.p.map(x => `<li>${escH(x)}</li>`).join("")}</ul>` : "");
    const r = li.getBoundingClientRect(), pw = 290, ph = pop.offsetHeight || 180;
    const left = Math.min(Math.max(12, r.left + r.width / 2 - pw / 2), innerWidth - pw - 12);
    let top = r.top - ph - 10; if (top < 76) top = r.bottom + 10;
    pop.style.left = left + "px"; pop.style.top = top + "px";
    pop.classList.add("show");
  }
  const hide = () => pop.classList.remove("show");
  document.querySelectorAll(".chips li").forEach(li => {
    if (!SKILLS[li.textContent.trim()]) return;
    li.dataset.skill = ""; li.tabIndex = 0;
    li.addEventListener("mouseenter", () => show(li));
    li.addEventListener("mouseleave", hide);
    li.addEventListener("focus", () => show(li));
    li.addEventListener("blur", hide);
    li.addEventListener("click", e => { e.stopPropagation(); pop.classList.contains("show") ? hide() : show(li); });
  });
  document.addEventListener("click", hide);
  window.addEventListener("scroll", hide, { passive: true });
})();

/* ═══ Plain-English tooltips for project tags ═══ */
const GLOSSARY = {
  "Exchange Online": "Microsoft's cloud email service — mailboxes, calendars and mail flow.",
  "SharePoint": "Microsoft's cloud platform for team sites, documents and lists.",
  "OneDrive": "Personal cloud file storage for each Microsoft 365 user.",
  "Teams": "Microsoft's chat, meetings and collaboration app.",
  "Dynamics 365": "Microsoft's business apps — here, used for support case management.",
  "AvePoint Fly": "A third-party tool for migrating Microsoft 365 data between tenants.",
  "DNS": "The internet's address book — maps names to servers, including mail servers.",
  "Power Automate": "Microsoft's low-code workflow tool — 'when X happens, do Y'.",
  "Copilot Studio": "Microsoft's tool for building chatbots and AI agents.",
  "GitHub Actions": "Automation that runs on every code push — here, it deploys this site.",
  "S3": "AWS object storage — this site's files live here.",
  "CloudFront": "AWS's CDN — serves this site fast and over HTTPS worldwide.",
  "IAM": "Identity & access management — who (or what) can do what.",
};
document.querySelectorAll(".tags li").forEach(li => {
  const tip = GLOSSARY[li.textContent.trim()];
  if (tip) { li.dataset.tip = tip; li.tabIndex = 0; }
});

/* ═══ Project filters ═══ */
(function(){
  const btns = document.querySelectorAll("#filters button");
  const cards = [...document.querySelectorAll("#project-grid .project")];
  btns.forEach(b => b.addEventListener("click", () => {
    const f = b.dataset.f;
    btns.forEach(x => x.classList.toggle("on", x === b));
    cards.forEach(c => {
      const show = f === "all" || c.dataset.cat.split(" ").includes(f);
      c.classList.toggle("hide", !show);
      if (show) { c.classList.remove("fade-in"); void c.offsetWidth; c.classList.add("fade-in", "in"); }
    });
  }));
})();

/* ═══ QUICK ACTIONS PALETTE (Ctrl/⌘ + K) ═══ */
const ACTIONS = [
  { icon: "ri-user-line",          label: "About me",           hint: "Go",     run: () => go("#about") },
  { icon: "ri-tools-line",         label: "Skills",             hint: "Go",     run: () => go("#skills") },
  { icon: "ri-briefcase-line",     label: "Experience",         hint: "Go",     run: () => go("#experience") },
  { icon: "ri-folder-line",        label: "Projects",           hint: "Go",     run: () => go("#projects") },
  { icon: "ri-award-line",         label: "Certifications",     hint: "Go",     run: () => go("#certs") },
  { icon: "ri-terminal-box-line",  label: "Open terminal",      hint: "Go",     run: () => { go("#cli"); setTimeout(() => cliInput.focus({ preventScroll: true }), 500); } },
  { icon: "ri-mail-send-line",     label: "Send me a message",  hint: "Go",     run: () => { go("#contact"); setTimeout(() => $("cf-name").focus({ preventScroll: true }), 500); } },
  { icon: "ri-file-copy-line",     label: "Copy email address", hint: "Action", run: copyEmail },
  { icon: "ri-file-download-line", label: "Open resume (PDF)",  hint: "Action", run: () => window.open("./assets/resume.pdf", "_blank") },
  { icon: "ri-linkedin-box-line",  label: "LinkedIn",           hint: "Link",   run: () => window.open(LINKEDIN, "_blank") },
  { icon: "ri-github-line",        label: "GitHub",             hint: "Link",   run: () => window.open(GITHUB, "_blank") },
  { icon: "ri-contrast-2-line",    label: "Toggle dark mode",   hint: "Action", run: toggleTheme },
  { icon: "ri-arrow-up-line",      label: "Back to top",        hint: "Go",     run: () => go("#home") },
];
const pal = $("palette"), palInput = $("palette-input"), palList = $("palette-list");
let filtered = ACTIONS, sel = 0;
function renderPalette(){
  const q = palInput.value.trim().toLowerCase();
  filtered = ACTIONS.filter(a => a.label.toLowerCase().includes(q));
  sel = Math.min(sel, Math.max(0, filtered.length - 1));
  palList.innerHTML = filtered.length
    ? filtered.map((a, i) => `<li class="${i === sel ? "sel" : ""}" data-i="${i}"><i class="${a.icon}"></i>${a.label}<small>${a.hint}</small></li>`).join("")
    : `<li class="empty">No matches — try "resume" or "email"</li>`;
}
function openPalette(){ pal.hidden = false; palInput.value = ""; sel = 0; renderPalette(); palInput.focus(); document.body.style.overflow = "hidden"; }
function closePalette(){ pal.hidden = true; document.body.style.overflow = ""; }
function runSel(i){ const a = filtered[i]; if (!a) return; closePalette(); a.run(); }
$("palette-btn").addEventListener("click", openPalette);
pal.addEventListener("click", e => { if (e.target === pal) closePalette(); });
palInput.addEventListener("input", () => { sel = 0; renderPalette(); });
palList.addEventListener("click", e => { const li = e.target.closest("li[data-i]"); if (li) runSel(+li.dataset.i); });
palList.addEventListener("mousemove", e => {
  const li = e.target.closest("li[data-i]");
  if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; renderPalette(); }
});
document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? openPalette() : closePalette(); return; }
  if (pal.hidden) return;
  if (e.key === "Escape") closePalette();
  else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, filtered.length); renderPalette(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + filtered.length) % Math.max(1, filtered.length); renderPalette(); }
  else if (e.key === "Enter") {
    e.preventDefault();
    const typed = palInput.value.trim().toLowerCase();
    if (COMMANDS[typed]) { closePalette(); go("#cli"); setTimeout(() => runCommand(typed), 400); }
    else runSel(sel);
  }
});

/* ═══ CONTACT FORM (EmailJS) ═══ */
const formLoadedAt = Date.now();
$("contact-form").addEventListener("submit", async e => {
  e.preventDefault();
  const name = $("cf-name").value.trim(), email = $("cf-email").value.trim();
  const subject = $("cf-subject").value.trim(), message = $("cf-message").value.trim();
  const status = $("form-status"), btn = $("form-submit-btn"), btnText = $("form-btn-text");
  const fail = msg => { status.textContent = msg; status.className = "form-status err"; };
  // Spam traps: bots fill the hidden field, and submit faster than a person can type
  if ($("cf-website") && $("cf-website").value) { status.textContent = "Thanks! Your message is on its way."; status.className = "form-status ok"; return; }
  if (Date.now() - formLoadedAt < 3000) return fail("That was quick. Please try again in a moment.");
  if (!name || !email || !message) return fail("Please fill in your name, email and message.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("That email doesn't look right.");
  if (typeof emailjs === "undefined") return fail(`Couldn't load the mail service. Email me at ${EMAIL}.`);
  btn.disabled = true; btnText.textContent = "Sending…";
  try {
    emailjs.init({ publicKey: EMAILJS_KEY, blockHeadless: true, limitRate: { id: "contact", throttle: 15000 } });
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      from_name: name, from_email: email, subject: subject || "Portfolio contact", message, to_name: "Shakeer"
    });
    status.textContent = `Thanks, ${name.split(" ")[0]}! Your message is on its way.`;
    status.className = "form-status ok";
    e.target.reset();
  } catch {
    fail(`Something went wrong. Email me directly at ${EMAIL}.`);
  }
  btn.disabled = false; btnText.textContent = "Send message";
});

/* ═══ Back to top ═══ */
$("to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  $("brand").focus({ preventScroll: true });
});

/* ═══ Tab title when visitor leaves ═══ */
(function(){
  const original = document.title;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "Come back, the cloud misses you" : original;
  });
})();

/* ═══ Retro v1 mode: click the logo 3 times ═══ */
(function(){
  let clicks = 0, timer;
  $("brand").addEventListener("click", () => {
    clicks++; clearTimeout(timer);
    timer = setTimeout(() => clicks = 0, 1200);
    if (clicks < 3) return;
    clicks = 0;
    if (!$("retro-font")) {
      const l = document.createElement("link");
      l.id = "retro-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
      document.head.appendChild(l);
    }
    const on = document.documentElement.classList.toggle("retro");
    toast(on ? "v1 mode, a tribute to my first portfolio. Click the logo 3× to exit." : "Back to the future");
  });
})();

/* ═══ Print: show everything ═══ */
window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach(d => { d.dataset.wasOpen = d.open; d.open = true; }));
window.addEventListener("afterprint",  () => document.querySelectorAll("details").forEach(d => { d.open = d.dataset.wasOpen === "true"; }));

/* ═══ A note for the curious (DevTools) ═══ */
console.log(
  "%cHey, you opened DevTools!%c\nI'm Shakeer — M365 & Cloud Engineer. Hiring? " + EMAIL +
  "\nThis site is plain HTML/CSS/JS on S3 + CloudFront, deployed by GitHub Actions." +
  "\nFellow Naruto fan? Try 'dattebayo' or 'troublesome' in the terminal.",
  "font:600 14px Inter,sans-serif;color:#22d3ee", "font:12px Inter,sans-serif"
);


/* ═══ Contact: local time in Hyderabad ═══ */
(function () {
  const el = $("local-time"); if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 30000);
})();
