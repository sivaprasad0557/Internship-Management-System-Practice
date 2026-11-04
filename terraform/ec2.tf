resource "aws_instance" "web" {
  ami                    = "ami-033ea4ff4a9c726dc"
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]
  key_name               = "devops-ka"

  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y nginx
              systemctl enable nginx
              systemctl start nginx
              EOF

  tags = {
    Name        = "${var.project_name}-web-server"
    Environment = var.environment
  }
}
