output "vpc_id" {
  value = module.vpc.vpc_id
}

output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "rds_endpoint" {
  value     = module.rds.db_endpoint
  sensitive = true
}

output "rds_database_name" {
  value = module.rds.db_name
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}

output "alb_dns_name" {
  value = module.alb.alb_dns_name
}

output "nlb_dns_name" {
  value = module.nlb.nlb_dns_name
}

output "api_gateway_invoke_url" {
  value = module.api_gateway.invoke_url
}

output "route53_fqdn" {
  value = module.route53.app_fqdn
}

output "waf_web_acl_arn" {
  value = module.waf.web_acl_arn
}
