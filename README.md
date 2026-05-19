# End-to-End DevOps Implementation on MERN Stack

[![AWS](https://img.shields.io/badge/AWS-%F0%9F%9B%A1-orange)](https://aws.amazon.com)
[![Terraform](https://img.shields.io/badge/Terraform-%E2%9C%A8-lightgrey)](https://www.terraform.io)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)](https://kubernetes.io)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com)
[![GitLab CI](https://img.shields.io/badge/GitLab%20CI-FC6D26?style=flat&logo=gitlab&logoColor=white)](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/)
[![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=flat&logo=argo&logoColor=white)](https://argoproj.github.io/cd/)

![DevOps architecture — Terraform, GitLab CI/CD, Argo CD, EKS](assets/architecture-gitlab-cicd.png)

End-to-end DevOps for a containerized MERN todo application on **AWS EKS**, with **modular Terraform**, **GitLab CI/CD**, **NGINX Ingress**, **Argo CD GitOps**, **RDS PostgreSQL**, and **Prometheus + Grafana** observability.

## Tools & Technologies

**Infrastructure & Cloud (Terraform):**
- VPC, public/private subnets, NAT, security groups
- Application Load Balancer (ALB), Network Load Balancer (NLB)
- API Gateway, Route 53, WAF
- S3 (application assets), RDS PostgreSQL
- Amazon EKS

**CI/CD & GitOps:**
- GitLab CI/CD — build, scan, push to ECR, update manifests
- Argo CD — continuous delivery from Git
- NGINX Ingress Controller — in-cluster routing

**Monitoring:**
- Prometheus — metrics scraping
- Grafana — dashboards and visualization

**Application:**
- React, Express.js, Node.js
- **PostgreSQL on AWS RDS** (managed persistence)

## Architecture

```
Internet → Route 53 → WAF → API Gateway → ALB → NLB → NGINX Ingress → EKS (frontend + API)
                                                                              ↓
                                                                        RDS PostgreSQL
S3 ← static/assets (optional uploads)
```

## Project Structure

```
├── Application-Code/           # React frontend + Express API (PostgreSQL)
├── Terraform-Infrastructure/   # Modular IaC (VPC, ALB, NLB, API GW, Route53, S3, WAF, RDS, EKS)
├── Kubernetes-Manifests-file/  # Deployments, Services, NGINX Ingress
├── argocd/                     # Argo CD Application & AppProject
├── monitoring/                 # Prometheus/Grafana Helm values + ServiceMonitor
├── .gitlab-ci.yml              # GitLab CI/CD pipeline
└── assets/                     # Architecture diagram
```

## Getting Started

### Prerequisites
- AWS account with appropriate permissions
- Terraform installed
- kubectl configured for your EKS cluster
- Docker installed

### 1. Provision AWS infrastructure

```bash
cd Terraform-Infrastructure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with domain, DB credentials, etc.
terraform init
terraform plan
terraform apply
```

Note: Route 53 module expects an existing public hosted zone for `domain_name`.

### 2. Configure kubectl for EKS

```bash
aws eks update-kubeconfig --region us-east-1 --name mern-eks-cluster
```

### 3. Install cluster add-ons

```bash
# NGINX Ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace

# Argo CD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl apply -f argocd/

# Monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack -n monitoring --create-namespace -f monitoring/prometheus-values.yaml
kubectl apply -f monitoring/servicemonitor-backend.yaml
```

### 4. Database secret & deploy

```bash
# Build DATABASE_URL from Terraform output: postgresql://user:pass@endpoint:5432/todoapp
cp Kubernetes-Manifests-file/postgres-sec.example.yaml Kubernetes-Manifests-file/postgres-sec.yaml
# Edit postgres-sec.yaml, then:
kubectl apply -f Kubernetes-Manifests-file/
```

Or let Argo CD sync after you configure `argocd/application-three-tier.yaml`.

### 5. GitLab CI/CD variables

Set in GitLab → Settings → CI/CD → Variables:

| Variable | Description |
|----------|-------------|
| `ECR_REGISTRY` | `123456789012.dkr.ecr.us-east-1.amazonaws.com` |
| `AWS_ACCESS_KEY_ID` | CI user with ECR push |
| `AWS_SECRET_ACCESS_KEY` | CI secret |

Pipeline: test → build → Trivy scan → push to ECR → update manifest image tags on `main`.

## Resume alignment

This repository implements the stack described in the project portfolio:

| Capability | Location |
|------------|----------|
| Modular Terraform (VPC, ALB, NLB, API GW, Route 53, S3, WAF, RDS) | `Terraform-Infrastructure/modules/` |
| GitLab CI/CD for Docker images | `.gitlab-ci.yml` |
| Kubernetes + NGINX Ingress | `Kubernetes-Manifests-file/ingress.yaml` |
| Argo CD GitOps | `argocd/` |
| Prometheus + Grafana | `monitoring/` |
| RDS PostgreSQL (not in-cluster MongoDB) | `Terraform-Infrastructure/modules/rds/`, `Application-Code/backend/` |

## Contributing

Issues and pull requests are welcome.
