# Portfolio Setup Guide
## Shakeer Ahmad — shakeer.space

---

## WHAT WAS ADDED

| Feature | How it works | Cost |
|---|---|---|
| ✅ Contact Form | EmailJS (sends real emails) | Free |
| ✅ Live GitHub Stats | GitHub public API | Free |
| ✅ Admin Panel | Password-protected, localStorage | Free |
| ✅ Visitor Counter | CountAPI | Free |

---

## STEP 1 — SET UP EMAILJS (Contact Form)

The contact form uses EmailJS to send emails without any backend server.

### 1a. Create your account
1. Go to **https://www.emailjs.com** → Sign Up (free)
2. After login, go to **Email Services** → **Add New Service**
3. Choose **Gmail** (recommended since you have gmail)
4. Click **Connect Account** → authorize your Gmail
5. Name it whatever → click **Create Service**
6. **Copy the Service ID** (looks like `service_abc123`)

### 1b. Create an Email Template
1. Go to **Email Templates** → **Create New Template**
2. Use this template content:

**Subject:** `New message from {{from_name}} — {{subject}}`

**Body:**
```
From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form.
```

3. In **To email** field: put `ahmad.shakeer.md@gmail.com`
4. Click **Save** → **Copy the Template ID** (looks like `template_xyz789`)

### 1c. Get your Public Key
1. Go to **Account** → **General** tab
2. **Copy your Public Key** (looks like `AbCdEf123456`)

### 1d. Update index.html
Open `index.html` and find this section near line 600:

```javascript
const EMAILJS_SERVICE  = "YOUR_SERVICE_ID";   // ← paste your Service ID
const EMAILJS_TEMPLATE = "YOUR_TEMPLATE_ID";  // ← paste your Template ID
const EMAILJS_KEY      = "YOUR_PUBLIC_KEY";   // ← paste your Public Key
```

Replace those 3 values with your real ones.

---

## STEP 2 — VISITOR COUNTER

This works **automatically** — no setup needed.

The counter uses **countapi.xyz** and hits `https://api.countapi.xyz/hit/shakeer.space/shakeer-portfolio-visitors` every time someone loads your page.

It will show on the hero section: `VISITORS: 142`

If you want to reset it or use a different key, change this in `index.html`:
```javascript
const COUNTAPI_KEY = "shakeer-portfolio-visitors"; // make it unique
```

---

## STEP 3 — GITHUB LIVE STATS

This works **automatically** too — no API key required since `Sparkeeer` is a public profile.

It fetches:
- Public repo count
- Total stars across all repos
- Followers / Following
- Your 6 most recently updated repos (non-forks)

If you ever rename your GitHub username, update:
```javascript
const GITHUB_USERNAME = "Sparkeeer"; // ← change if needed
```

---

## STEP 4 — ADMIN PANEL

The admin panel lets you add projects visually without touching code.

**Default password:** `devops2025`

To change it, find this in `index.html`:
```javascript
const ADMIN_PASSWORD = "devops2025"; // ← change this!
```

### How to use:
1. Click **⚙ ADMIN: ADD PROJECT** button above the projects section
2. Type the password
3. Fill in the form → click **ADD PROJECT**
4. Project appears live on the page
5. Click **EXPORT JSON** to download your projects as a `.json` file (back it up!)
6. Projects are saved in browser `localStorage` — they persist across page reloads

> **Important:** localStorage is tied to your browser. If someone visits from another browser/device, they won't see admin-added projects. For permanent storage, use the **EXPORT JSON** button and paste the data into `index.html` manually as static cards.

---

## STEP 5 — PUSH TO GITHUB

### 5a. Your folder structure should be:
```
portfolio/
├── index.html          ← main file (the one we edited)
├── SETUP.md            ← this file
├── resume.pdf          ← your resume
├── logo.png            ← your logo
├── favicon.ico
├── favicon-96x96.png
├── apple-touch-icon.png
└── site.webmanifest
```

### 5b. Initialize a Git repo (first time only)

Open a terminal in your `portfolio/` folder:

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "feat: add contact form, github stats, admin panel, visitor counter"
```

### 5c. Connect to GitHub

1. Go to **github.com** → click **New repository**
2. Name it `portfolio` (or `shakeer.space` or anything)
3. Keep it **Public**
4. **Don't** check "Initialize with README" (you already have files)
5. Click **Create repository**
6. Copy the commands GitHub shows you, which look like:

```bash
git remote add origin https://github.com/Sparkeeer/portfolio.git
git branch -M main
git push -u origin main
```

Run those 3 commands in your terminal.

### 5d. Every future update

```bash
git add .
git commit -m "update: describe what you changed"
git push
```

Your GitHub Actions pipeline will automatically deploy to S3 + CloudFront on every push to `main`.

---

## STEP 6 — VERIFY EVERYTHING WORKS

After deploying, test each feature:

- [ ] Visit your site → visitor count increments
- [ ] Scroll to GitHub section → repos load within 1-2 seconds
- [ ] Fill contact form → you receive an email at gmail
- [ ] Click ADMIN → enter password `devops2025` → add a test project
- [ ] Export JSON from admin panel → save it as backup

---

## TROUBLESHOOTING

**Contact form shows "EMAILJS NOT CONFIGURED YET"**
→ You haven't replaced the 3 config values in `index.html` yet (Step 1d)

**GitHub section shows "could not fetch GitHub data"**
→ GitHub API rate-limits unauthenticated requests (60/hour). Wait a bit or check that `GITHUB_USERNAME` is correct.

**Visitor counter shows "—"**
→ CountAPI might be down or you're behind a corporate firewall. Not critical — just cosmetic.

**Admin projects disappeared**
→ They're in `localStorage`. Clearing browser data wipes them. Always export JSON as backup.

---

## QUICK REFERENCE — Files to never commit

Add a `.gitignore` file with:
```
.DS_Store
Thumbs.db
*.log
node_modules/
```

Create it:
```bash
echo ".DS_Store\nThumbs.db\n*.log\nnode_modules/" > .gitignore
git add .gitignore
git commit -m "chore: add gitignore"
git push
```