# Shakeer Ahmad — DevOps Portfolio

Personal portfolio site built from scratch and deployed on AWS.
Live at: https://shakeer.space

---

## Stack

- HTML, CSS, JavaScript
- AWS S3 — static site hosting
- AWS CloudFront — CDN and HTTPS
- AWS ACM — SSL certificate
- AWS IAM — least-privilege deployment user
- GitHub Actions — CI/CD pipeline

---

## How it works

Every push to `main` triggers the GitHub Actions workflow which:

1. Authenticates with AWS using repository secrets
2. Syncs all files to the S3 bucket
3. Creates a CloudFront invalidation to purge the cache

Deploy time is under 60 seconds from push to live.

---

## Project structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── index.html
```

---

## CI/CD Pipeline

```
git push → GitHub Actions → S3 sync → CloudFront invalidation → Live
```

Credentials are stored as GitHub repository secrets. The IAM user has scoped permissions — S3 write access and CloudFront invalidation only.

---
