
output "vpc_id" {
  description = "ID of the Terraform VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.public.id
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.main.id
}

output "route_table_id" {
  description = "ID of the public route table"
  value       = aws_route_table.public.id
}

output "security_group_id" {
  description = "ID of the web security group"
  value       = aws_security_group.web.id
}

output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.web.id
}

output "ec2_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.web.public_ip
}

output "ec2_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.web.public_dns
}
output "user_service_ecr_url" {
  description = "User service ECR repository URL"
  value       = aws_ecr_repository.user_service.repository_url
}

output "product_service_ecr_url" {
  description = "Product service ECR repository URL"
  value       = aws_ecr_repository.product_service.repository_url
}

output "order_service_ecr_url" {
  description = "Order service ECR repository URL"
  value       = aws_ecr_repository.order_service.repository_url
}
output "iam_role_arn" {
  description = "ARN of the project EC2 IAM role"
  value       = aws_iam_role.ec2_role.arn
}

output "iam_instance_profile_name" {
  description = "Name of the project EC2 instance profile"
  value       = aws_iam_instance_profile.ec2_profile.name
}

output "iam_instance_profile_arn" {
  description = "ARN of the project EC2 instance profile"
  value       = aws_iam_instance_profile.ec2_profile.arn
}
