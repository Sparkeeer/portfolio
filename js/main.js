/* ═══ CONFIG — EDIT THESE ═══ */
const GITHUB_USERNAME  = "Sparkeeer";
const EMAILJS_SERVICE  = "service_rt2f6h1";
const EMAILJS_TEMPLATE = "template_fauo5dc";
const EMAILJS_KEY      = "a4H-VSCPY1gaWM7x2";

/* ═══ INIT ═══ */
document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  const l = document.getElementById("loading-screen");

  setTimeout(() => {
    l.style.opacity = "0";
    setTimeout(() => l.style.display = "none", 500);
  }, 1400);

  loadGitHubStats();

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_KEY);
  }
});

/* ═══ DOT CANVAS ═══ */
(function(){
  const canvas=document.getElementById("dot-canvas"),ctx=canvas.getContext("2d");
  const S=40,R=1.1,H=120;let mouse={x:-999,y:-999},W,H2,dots=[];

  function resize(){
    W=canvas.width=window.innerWidth;
    H2=canvas.height=window.innerHeight;
    build();
  }

  function build(){
    dots=[];
    for(let r=0;r<=Math.ceil(H2/S);r++){
      for(let c=0;c<=Math.ceil(W/S);c++){
        dots.push({x:c*S,y:r*S});
      }
    }
  }

  function draw(){
    ctx.clearRect(0,0,W,H2);

    for(const d of dots){
      const dist=Math.hypot(d.x-mouse.x,d.y-mouse.y);
      const prox=Math.max(0,1-dist/H);

      ctx.beginPath();
      ctx.arc(d.x,d.y,R+prox*3,0,Math.PI*2);
      ctx.fillStyle=`rgba(56,189,248,${0.1+prox*0.5})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("mousemove",e=>{
    mouse.x=e.clientX;
    mouse.y=e.clientY;
  });

  window.addEventListener("resize",resize);

  resize();
  draw();
})();

/* ═══ CURSOR ═══ */
(function(){
  const dot=document.getElementById("cursor-dot");

  document.addEventListener("mousemove",e=>{
    dot.style.left=e.clientX+"px";
    dot.style.top=e.clientY+"px";
  });
})();

/* ═══ TYPING ═══ */
(function(){
  const el = document.getElementById("typed-text");
  const text = ">_ SHAKEER AHMAD";
  let i = 0;

  function type(){
    el.textContent = text.slice(0, i);
    i++;

    if(i <= text.length){
      setTimeout(type, i < 4 ? 110 : 58);
    }
  }

  window.addEventListener("load", () => {
    setTimeout(type, 1450);
  });
})();

/* ═══ SCROLL PROGRESS ═══ */
window.addEventListener("scroll",()=>{
  const s=document.documentElement.scrollTop;
  const t=document.documentElement.scrollHeight-document.documentElement.clientHeight;

  document.getElementById("scroll-progress").style.width=`${(s/t)*100}%`;
},{passive:true});

/* ═══ ACTIVE NAV ═══ */
(function(){
  const SECS=["about","skills","github","projects","experience","contact"];
  const links=document.querySelectorAll(".nav-link");
  const ind=document.getElementById("nav-indicator");
  const navList=document.getElementById("nav-list");

  function setInd(link){
    if(!link||!ind)return;

    const nr=navList.getBoundingClientRect();
    const lr=link.parentElement.getBoundingClientRect();

    ind.style.left=`${lr.left-nr.left}px`;
    ind.style.width=`${lr.width}px`;
  }

  function onScroll(){
    let cur="";

    for(const id of SECS){
      const s=document.getElementById(id);
      if(s&&window.scrollY>=s.offsetTop-120){
        cur=id;
      }
    }

    links.forEach(l=>{
      const a=l.dataset.section===cur;
      l.classList.toggle("active",a);
      if(a)setInd(l);
    });
  }

  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",onScroll);

  setTimeout(onScroll,200);
})();

/* ═══ SCROLL REVEAL ═══ */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("revealed");
        obs.unobserve(e.target);
      }
    });
  },{threshold:.12});

  document.querySelectorAll(".reveal-item").forEach(el=>obs.observe(el));
})();

/* ═══ TIMELINE REVEAL ═══ */
window.addEventListener("DOMContentLoaded",()=>{
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("show");
        obs.unobserve(e.target);
      }
    });
  },{threshold:.1});

  document.querySelectorAll(".timeline-item").forEach(item=>{
    if(item.getBoundingClientRect().top<window.innerHeight){
      item.classList.add("show");
    }else{
      obs.observe(item);
    }
  });
});

/* ═══ EXPANDABLE TIMELINE ═══ */
function toggleExpand(item){
  const d=item.querySelector(".expandable-details");
  const open=item.classList.contains("open");

  item.classList.toggle("open",!open);
  d.classList.toggle("open",!open);
  item.setAttribute("aria-expanded",String(!open));
}

/* ═══ TERMINAL ═══ */
let tState="normal";

function terminalClose(){
  document.getElementById("main-terminal").classList.add("closed");
  document.getElementById("terminal-restore").classList.add("visible");
  tState="closed";
}

function terminalMinimize(){
  const w=document.getElementById("main-terminal");

  if(tState==="minimized"){
    w.classList.remove("minimized");
    tState="normal";
  }else{
    w.classList.remove("maximized");
    w.classList.add("minimized");
    tState="minimized";
  }
}

function terminalMaximize(){
  const w=document.getElementById("main-terminal");

  if(tState==="maximized"){
    w.classList.remove("maximized");
    document.body.style.overflow="";
    tState="normal";
  }else{
    w.classList.remove("minimized");
    w.classList.add("maximized");
    document.body.style.overflow="hidden";
    tState="maximized";
  }
}

function terminalRestore(){
  const w=document.getElementById("main-terminal");

  w.classList.remove("closed","minimized","maximized");
  document.getElementById("terminal-restore").classList.remove("visible");
  document.body.style.overflow="";
  tState="normal";
}

/* ═══ CMD PALETTE ═══ */
(function(){
  const input=document.getElementById("cmd-search");
  const noRes=document.getElementById("cmd-no-results");
  const counter=document.getElementById("cmd-counter");
  const groups=document.querySelectorAll(".cmd-group[data-group]");

  function countVisible(){
    let n=0,total=0;

    document.querySelectorAll(".cmd-row[data-skill]:not(.soon-row)").forEach(r=>{
      total++;
      if(r.style.display!=="none")n++;
    });

    counter.textContent=n===total?`${total} SKILLS`:`${n} / ${total}`;
  }

  setTimeout(countVisible,100);

  input.addEventListener("input",()=>{
    const q=input.value.trim().toLowerCase();
    let any=false;

    groups.forEach(group=>{
      const rows=group.querySelectorAll(".cmd-row[data-skill]");
      let anyMatch=false;

      rows.forEach(row=>{
        const match=!q||row.dataset.skill.toLowerCase().includes(q);
        row.style.display=match?"":"none";
        if(match)anyMatch=true;
      });

      group.style.display=anyMatch?"":"none";
      if(anyMatch)any=true;
    });

    noRes.style.display=any?"none":"block";

    countVisible();
  });

  document.querySelectorAll(".cmd-row[data-skill]:not(.soon-row)").forEach(row=>{
    row.addEventListener("click",()=>{
      const expand=row.querySelector(".cmd-expand");
      if(!expand)return;

      const open=row.classList.contains("expanded");

      document.querySelectorAll(".cmd-row.expanded").forEach(r=>{
        r.classList.remove("expanded");
        r.querySelector(".cmd-expand")?.classList.remove("open");
      });

      if(!open){
        row.classList.add("expanded");
        expand.classList.add("open");
      }
    });
  });

  document.addEventListener("keydown",e=>{
    if(e.key==="/"&&document.activeElement!==input){
      e.preventDefault();
      input.focus();
    }
  });
})();

/* ═══ PROJECT FILTER ═══ */
document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));

    btn.classList.add("active");

    const f=btn.dataset.filter;

    document.querySelectorAll(".project-card").forEach(card=>{
      card.classList.toggle("hidden",f!=="all"&&!card.dataset.tags.includes(f));
    });
  });
});

/* ═══ EMAIL COPY ═══ */
function showToast(){
  const t=document.getElementById("copy-toast");

  t.classList.add("show");

  setTimeout(()=>t.classList.remove("show"),2200);
}

function copyEmail(e){
  e.preventDefault();

  navigator.clipboard.writeText("ahmad.shakeer.md@gmail.com")
    .then(showToast)
    .catch(()=>{
      window.location.href="mailto:ahmad.shakeer.md@gmail.com";
    });
}

document.getElementById("email-copy-btn")?.addEventListener("click",copyEmail);

/* ═══ THEME ═══ */
function toggleTheme(){
  document.body.classList.toggle("light");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light")?"light":"dark"
  );
}

window.addEventListener("DOMContentLoaded",()=>{
  if(localStorage.getItem("theme")==="light"){
    document.body.classList.add("light");
  }
});

/* ═══ MOBILE NAV ═══ */
function toggleMobileNav(){
  const nav=document.getElementById("mobile-nav");
  const btn=document.getElementById("hamburger");

  nav.classList.toggle("open");
  btn.classList.toggle("open");

  document.body.style.overflow=nav.classList.contains("open")?"hidden":"";
}

function closeMobileNav(){
  document.getElementById("mobile-nav").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");

  document.body.style.overflow="";
}

/* ═══ PROJECT MODAL ═══ */
const PROJECT_DETAILS={
  aws:{
    title:"AWS TWO-TIER ARCHITECTURE",
    description:"Designed and deployed a scalable two-tier architecture on AWS using Flask and MySQL, containerized with Docker and load-balanced via Nginx.",
    metrics:[
      {value:"Docker Compose",label:"Orchestration"},
      {value:"VPC Isolated",label:"Network Security"},
      {value:"2-Tier",label:"Architecture"}
    ],
    items:[
      "Containerized Flask application and MySQL database using Docker and Docker Compose.",
      "Nginx configured as a reverse proxy and load balancer for the application tier.",
      "Separated application and database layers for security and scalability.",
      "Deployed inside a custom VPC with public and private subnets.",
      "Security groups configured with least-privilege access between tiers."
    ],
    github:"https://github.com/Sparkeeer"
  },
  cicd:{
    title:"PORTFOLIO CI/CD PIPELINE",
    description:"Production-grade static site on AWS S3 + CloudFront with custom domain, HTTPS via ACM, and a fully automated GitHub Actions deployment pipeline.",
    metrics:[
      {value:"<60s",label:"Deploy Time"},
      {value:"OAC + ACM",label:"Secure HTTPS"},
      {value:"IAM Scoped",label:"Least Privilege"}
    ],
    items:[
      "Static site hosted on AWS S3, served via CloudFront CDN with Origin Access Control (OAC).",
      "HTTPS enforced via AWS Certificate Manager (ACM) with custom domain routing.",
      "GitHub Actions workflow triggers automatically on every push to main branch.",
      "AWS credentials stored securely as GitHub Secrets; IAM user has least-privilege S3 write permissions.",
      "DNS, domain routing, and www redirects configured via Cloudflare and Spaceship.",
      "Troubleshot real-world issues: DNS propagation, SSL validation, and access permission mismatches."
    ],
    github:"https://github.com/Sparkeeer/portfolio"
  }
};

function openProject(key){
  const p=PROJECT_DETAILS[key];
  if(!p)return;

  const mHTML=p.metrics
    ? `<div style="display:flex;gap:20px;flex-wrap:wrap;margin:18px 0;padding:16px;background:rgba(56,189,248,0.04);border:1px solid rgba(56,189,248,0.1);border-radius:8px;">${p.metrics.map(m=>`<div><div style="font-family:'Press Start 2P';font-size:11px;color:var(--accent)">${m.value}</div><div style="font-size:11px;color:var(--text-dim);margin-top:3px">${m.label}</div></div>`).join("")}</div>`
    : "";

  document.getElementById("modal-body").innerHTML=
    `<h3>${p.title}</h3><p>${p.description}</p>${mHTML}<ul>${p.items.map(i=>`<li>${i}</li>`).join("")}</ul>`;

  const gh=document.getElementById("modal-github-link");

  gh.href=p.github||"#";
  gh.style.display=p.github?"inline-block":"none";

  const m=document.getElementById("project-modal");

  m.classList.add("active");
  m.setAttribute("aria-hidden","false");

  document.body.classList.add("modal-open");
}

function closeProjectModal(){
  const m=document.getElementById("project-modal");

  m.classList.remove("active");
  m.setAttribute("aria-hidden","true");

  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    if(tState==="maximized"){
      terminalMaximize();
    }else{
      closeProjectModal();
    }
  }
});

/* ═══════════════════════════════
   LIVE GITHUB STATS
   Uses public GitHub API — no auth needed
═══════════════════════════════ */
const LANG_COLORS={
  "JavaScript":"#f1e05a",
  "Python":"#3572A5",
  "Shell":"#89e051",
  "HTML":"#e34c26",
  "CSS":"#563d7c",
  "TypeScript":"#2b7489",
  "Go":"#00ADD8",
  "Rust":"#dea584",
  "Java":"#b07219",
  "C":"#555555",
  "Dockerfile":"#384d54"
};

async function loadGitHubStats(){
  try{
    const [userRes,reposRes]=await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
    ]);

    const user=await userRes.json();
    const repos=await reposRes.json();

    document.getElementById("github-loading").style.display="none";
    document.getElementById("github-stats-grid").style.display="grid";

    document.getElementById("gh-repos").textContent=user.public_repos||0;
    document.getElementById("gh-followers").textContent=user.followers||0;
    document.getElementById("gh-following").textContent=user.following||0;

    const stars=repos.reduce((a,r)=>a+(r.stargazers_count||0),0);

    document.getElementById("gh-stars").textContent=stars;

    const repoList=document.getElementById("github-repos-list");

    repoList.innerHTML=repos
      .filter(r=>!r.fork)
      .slice(0,6)
      .map(r=>{
        const langDot=r.language&&LANG_COLORS[r.language]
          ? `<span class="repo-lang-dot" style="background:${LANG_COLORS[r.language]}"></span>${r.language}`
          : (r.language||"");

        return `<a class="github-repo-card" href="${r.html_url}" target="_blank">
          <div class="repo-name"><i class="ri-git-repository-line"></i>${r.name}</div>
          <div class="repo-desc">${r.description||"No description provided."}</div>
          <div class="repo-meta">
            <span><i class="ri-star-line"></i>${r.stargazers_count}</span>
            <span><i class="ri-git-fork-line"></i>${r.forks_count}</span>
            ${langDot?`<span>${langDot}</span>`:""}
          </div>
        </a>`;
      })
      .join("");
  }catch(e){
    document.getElementById("github-loading").textContent="// could not fetch GitHub data";
  }
}

/* ═══════════════════════════════
   CONTACT FORM (EmailJS)
   Sends real emails, no backend
═══════════════════════════════ */
async function submitContactForm(){
  const name=document.getElementById("cf-name").value.trim();
  const email=document.getElementById("cf-email").value.trim();
  const subject=document.getElementById("cf-subject").value.trim();
  const message=document.getElementById("cf-message").value.trim();

  const statusEl=document.getElementById("form-status");
  const btn=document.getElementById("form-submit-btn");
  const btnText=document.getElementById("form-btn-text");

  if(!name||!email||!message){
    statusEl.textContent="→ FILL IN NAME, EMAIL AND MESSAGE";
    statusEl.className="form-status err";
    return;
  }

  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    statusEl.textContent="→ INVALID EMAIL FORMAT";
    statusEl.className="form-status err";
    return;
  }

  if(EMAILJS_SERVICE==="YOUR_SERVICE_ID"){
    statusEl.textContent="→ EMAILJS NOT CONFIGURED YET (see SETUP.md)";
    statusEl.className="form-status err";
    return;
  }

  btn.disabled=true;
  btnText.textContent="SENDING";

  try{
    await emailjs.send(
      EMAILJS_SERVICE,
      EMAILJS_TEMPLATE,
      {
        from_name:name,
        from_email:email,
        subject:subject||"Portfolio Contact",
        message,
        to_name:"Shakeer"
      }
    );

    statusEl.textContent="✓ MESSAGE SENT! I'LL REPLY WITHIN 24 HOURS.";
    statusEl.className="form-status ok";

    document.getElementById("cf-name").value="";
    document.getElementById("cf-email").value="";
    document.getElementById("cf-subject").value="";
    document.getElementById("cf-message").value="";
  }catch(err){
    statusEl.textContent="→ SEND FAILED. EMAIL ME DIRECTLY: ahmad.shakeer.md@gmail.com";
    statusEl.className="form-status err";
  }

  btn.disabled=false;
  btnText.textContent="SEND MESSAGE";
}
