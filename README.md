# Shakeer Ahmad - Cloud DevOps Portfolio

A personal portfolio website built with a terminal-inspired aesthetic and deployed to Azure Static Web Apps through an automated GitHub Actions CI/CD pipeline.

The project demonstrates practical application of cloud hosting, CI/CD automation, DNS management, and modern static web deployment.

**Live site:** https://shakeer.space/

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Fonts: Press Start 2P, Inter
- Icons: RemixIcon, Devicon

### Cloud & Infrastructure

- Azure Static Web Apps - production static site hosting
- Cloudflare - DNS and custom domain management
### CI/CD

- GitHub Actions - automated deployment on every push to `main`

---

## Architecture

```text
GitHub Repository
       │
       │ Push to main
       ▼
GitHub Actions
       │
       │ Automated deployment
       ▼
Azure Static Web Apps
       │
       │ HTTPS / Custom Domain
       ▼
shakeer.space
       ▲
       │
Cloudflare DNS