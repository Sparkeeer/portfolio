#  Shakeer Ahmad | Cloud DevOps Portfolio

I have built this simple yet cool-looking automated portfolio with a "Terminal" aesthetic from scratch. This project showcases my skills in Infrastructure as Code (IaC), AWS/Azure migrations, and automated CI/CD pipelines.

## The Tech Stack used in this project
- **Frontend:** HTML5, CSS3 (Custom Grid System), JavaScript
- **Cloud:** AWS (S3 for Static Hosting)
- **CI/CD:** GitHub Actions (Automated Deployment to S3)
- **Security:** IAM User Least-Privilege Access

## Automated Deployment (CI/CD)
This repository is connected to an AWS S3 bucket via GitHub Actions.
- Every `git push` triggers a workflow that:
  1. Authenticates with AWS using encrypted secrets.
  2. Syncs the latest `index.html` and assets to the S3 bucket.
  3. Automatically updates the live site.

## Check-out the website here 👇
Check out the live site here: **https://shakeer-portfolio-2026.s3.ap-south-1.amazonaws.com/index.html**

---
