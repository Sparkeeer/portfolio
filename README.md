# Shakeer Ahmad — Cloud DevOps Portfolio

A personal portfolio website built with a terminal-inspired aesthetic, deployed to AWS S3 via an automated GitHub Actions pipeline. The project demonstrates practical application of cloud hosting, CI/CD automation, and IAM security principles.

**Live site:** [shakeer.space](https://www.shakeer.space/)

---

## Tech Stack

**Frontend**
- HTML5, CSS3 (custom grid system), JavaScript
- Fonts: Press Start 2P (pixel aesthetic), Inter
- Icons: RemixIcon, Devicon

**Cloud & Infrastructure**
- AWS S3 — static site hosting
- IAM — least-privilege user access for deployment

**CI/CD**
- GitHub Actions — automated deployment on every push to `main`

---

## How It Works

Every `git push` to the `main` branch triggers a GitHub Actions workflow that:

1. Authenticates with AWS using encrypted repository secrets
2. Syncs `index.html` and all static assets to the S3 bucket
3. Updates the live site automatically — no manual deployment required

---

## Repository Structure

```
portfolio/
├── .github/
│   └── workflows/         # GitHub Actions CI/CD pipeline
├── index.html             # Main site (single-page)
├── favicon (1).png        # Site favicon
├── logo-nobg.png          # Logo asset
└── trail portfolio blue print.txt  # Planning notes
```

---

## Local Development

No build step required. Open `index.html` directly in a browser:

```bash
git clone https://github.com/Sparkeeer/portfolio.git
cd portfolio
open index.html
```

---

## Deployment

Deployment is fully automated via GitHub Actions. To set it up in a fork:

1. Create an S3 bucket with static website hosting enabled.
2. Create an IAM user with `s3:PutObject` and `s3:DeleteObject` permissions scoped to that bucket.
3. Add the following secrets to your GitHub repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `S3_BUCKET`
4. Push to `main` — the workflow handles the rest.

---

## Contact

- **GitHub:** [github.com/Sparkeeer](https://github.com/Sparkeeer)
- **LinkedIn:** [linkedin.com/in/shakeerahmad05](https://linkedin.com/in/shakeerahmad05)
- **Email:** ahmad.shakeer.md@gmail.com
