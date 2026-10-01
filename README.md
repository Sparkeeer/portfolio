# Shakeer Ahmad — Cloud DevOps Portfolio

A personal portfolio website built with a terminal-inspired aesthetic and deployed to **Azure Static Web Apps** through an automated **GitHub Actions** CI/CD pipeline.

The project demonstrates practical application of cloud hosting, DNS configuration, CI/CD automation, and static web deployment.

**Live site:** [shakeer.space](https://shakeer.space/)

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- **Fonts:** Press Start 2P, Inter
- **Icons:** RemixIcon, Devicon

### Cloud & Infrastructure

- **Azure Static Web Apps** — production static site hosting (Free plan)
- **Cloudflare** — DNS and custom domain management
- **Spaceship** — domain registration

### CI/CD

- **GitHub Actions** — automated deployment on every push to `main`
- GitHub repository connected directly to Azure Static Web Apps

---

## How It Works

Every push to the `main` branch triggers the GitHub Actions workflow.

The deployment process:

1. GitHub Actions checks out the latest commit.
2. The workflow deploys the static website to Azure Static Web Apps.
3. Azure publishes the updated site automatically.
4. The production site is served through the custom domain `shakeer.space`.

No manual file uploads or Azure deployment steps are required after the initial configuration.

    Local changes
          ↓
    git push origin main
          ↓
    GitHub
          ↓
    GitHub Actions
          ↓
    Azure Static Web Apps
          ↓
    shakeer.space

---

## Repository Structure

    portfolio/
    ├── .github/
    │   └── workflows/
    │       └── azure-static-web-apps-*.yml   # Azure CI/CD pipeline
    ├── assets/                               # Images, icons, resume and site assets
    ├── css/
    │   └── styles.css                        # Site styling
    ├── js/
    │   └── main.js                           # Interactive functionality
    ├── 404-page.html                          # Custom 404 page
    ├── details.html                           # Extended portfolio details
    ├── index.html                             # Main portfolio page
    └── README.md                              # Project documentation

---

## Local Development

No build step is required.

Clone the repository:

    git clone https://github.com/Sparkeeer/portfolio.git
    cd portfolio

Open `index.html` directly in a browser, or use a local development server such as **VS Code Live Server**.

---

## Deployment

Deployment is fully automated through **Azure Static Web Apps** and **GitHub Actions**.

The repository is connected to an Azure Static Web App and configured to deploy from the `main` branch.

To publish an update:

    git add .
    git commit -m "Update portfolio"
    git push origin main

The GitHub Actions workflow automatically deploys the new commit to Azure Static Web Apps.

---

## Custom Domain

**Production domain:** [shakeer.space](https://shakeer.space/)

DNS is managed through **Cloudflare**, while **Azure Static Web Apps** provides the application hosting and HTTPS for the custom domain.

The domain is registered with **Spaceship**, while Cloudflare handles DNS management.

---

## Cloud Migration

The portfolio was previously hosted on **AWS S3 and CloudFront** with GitHub Actions-based deployment.

The hosting architecture was migrated to **Azure Static Web Apps**, replacing the previous AWS hosting and deployment setup.

DNS management was also moved to **Cloudflare**, while the domain registration remained with **Spaceship**.

### Previous Architecture

    GitHub
       ↓
    GitHub Actions
       ↓
    AWS S3
       ↓
    CloudFront
       ↓
    shakeer.space

### Current Architecture

    GitHub
       ↓
    GitHub Actions
       ↓
    Azure Static Web Apps
       ↓
    shakeer.space

    Cloudflare
       ↓
    DNS / Custom Domain
       ↓
    Azure Static Web Apps

---

## Contact

- **GitHub:** [github.com/Sparkeeer](https://github.com/Sparkeeer)
- **LinkedIn:** [linkedin.com/in/shakeerahmad05](https://linkedin.com/in/shakeerahmad05)
- **Email:** [ahmad.shakeer.md@gmail.com](mailto:ahmad.shakeer.md@gmail.com)