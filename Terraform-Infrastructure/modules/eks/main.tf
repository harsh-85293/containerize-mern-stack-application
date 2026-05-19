module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = "1.29"

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnet_ids

  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    default = {
      instance_types = var.instance_types
      min_size       = 1
      max_size       = 4
      desired_size   = var.desired_capacity
    }
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-eks"
  }
}
