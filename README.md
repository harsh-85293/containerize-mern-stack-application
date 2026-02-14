End-to-End DevOps Implementation on MERN Stack

[![AWS](https://img.shields.io/badge/AWS-%F0%9F%9B%A1-orange)](https://aws.amazon.com)
[![Terraform](https://img.shields.io/badge/Terraform-%E2%9C%A8-lightgrey)](https://www.terraform.io)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)](https://kubernetes.io)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com)
[![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=jenkins&logoColor=white)](https://www.jenkins.io)
[![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=flat&logo=argo&logoColor=white)](https://argoproj.github.io/cd/)

![Three-Tier Banner](assets/Three-Tier.gif)

Welcome to the End-to-End DevOps Implementation on MERN Stack project! 

This repository contains a complete DevOps implementation for a MERN (MongoDB, Express.js, React, Node.js) stack application, deployed on AWS EKS with full CI/CD automation, infrastructure as code, and monitoring capabilities.

#Tools & Technologies

Infrastructure & Cloud:
- Terraform - Infrastructure as Code
- AWS (EC2, EKS, ECR, Route 53, ALB) - Cloud infrastructure and services

CI/CD & Automation:
- Jenkins - Continuous Integration and Continuous Deployment
- Docker - Containerization
- Kubernetes - Container orchestration
- ArgoCD - GitOps-based continuous delivery
- NGINX Ingress - Load balancing and routing

Monitoring & Observability:
- Prometheus - Metrics collection and scraping
- Grafana - Real-time visualization and dashboards

Application Stack:
- MongoDB - Database
- Express.js - Backend framework
- React - Frontend framework
- Node.js - Runtime environment

Project Highlights

Infrastructure Provisioning
- Provisioned AWS infrastructure and Kubernetes cluster using Terraform to ensure automated and reproducible environment setup
- Automated VPC, subnets, security groups, and EKS cluster creation
- IAM roles and policies for secure access management

CI/CD Pipeline
- Configured Jenkins pipelines to automate build, test, container image creation, and artifact push for MERN stack services
- Integrated security scanning (SonarQube, OWASP Dependency-Check, Trivy)
- Automated Docker image building and pushing to AWS ECR

Kubernetes Deployment
- Deployed services on Kubernetes using Helm charts
- Implemented GitOps-based continuous delivery with ArgoCD
- Configured NGINX Ingress and Route 53 DNS routing for external access
- Set up persistent volumes for database storage

Monitoring & Observability
- Implemented monitoring and observability using Prometheus for metrics scraping
- Created Grafana dashboards for real-time visualization
- Configured health checks and alerting for application services

Project Structure

```
├── Application-Code/              # MERN stack application source code
│   ├── frontend/                  # React frontend application
│   └── backend/                   # Node.js/Express backend API
├── Jenkins-Pipeline-Code/         # Jenkins CI/CD pipeline definitions
├── Jenkins-Server-TF/            # Terraform scripts for Jenkins infrastructure
├── Kubernetes-Manifests-file/    # Kubernetes deployment manifests
│   ├── Frontend/                 # Frontend service deployment
│   ├── Backend/                  # Backend service deployment
│   ├── Database/                 # MongoDB deployment with persistent storage
│   └── ingress.yaml              # NGINX Ingress configuration
└── assets/                       # Project assets and diagrams
```

Prerequisites
- AWS Account with appropriate permissions
- Terraform installed
- kubectl configured
- Jenkins server (can be provisioned using Terraform scripts)
- Docker installed

Setup Steps
1. Infrastructure Provisioning:
   - Navigate to `Jenkins-Server-TF/` directory
   - Update `variables.tfvars` with your AWS credentials
   - Run `terraform init` and `terraform apply` to provision infrastructure

2. Configure Jenkins
   - Access Jenkins server and install required plugins
   - Configure AWS credentials and GitHub tokens
   - Create Jenkins pipelines using files from `Jenkins-Pipeline-Code/`

3. Deploy to Kubernetes:
   - Apply Kubernetes manifests from `Kubernetes-Manifests-file/`
   - Configure ArgoCD to sync from Git repository
   - Set up Route 53 DNS records pointing to Ingress

4. Setup Monitoring:
   - Deploy Prometheus and Grafana using Helm charts
   - Configure service discovery and scraping
   - Import Grafana dashboards for visualization


