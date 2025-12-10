#!/bin/bash

FRONTEND_IMAGE="317430949948.dkr.ecr.us-east-1.amazonaws.com/blog-frontend"
BACKEND_IMAGE="317430949948.dkr.ecr.us-east-1.amazonaws.com/blog-backend"

echo "Logging into ECR..."
aws ecr get-login-password --region us-east-1 | \
docker login --username AWS --password-stdin 317430949948.dkr.ecr.us-east-1.amazonaws.com

echo "Pulling latest images..."
docker pull $FRONTEND_IMAGE:latest
docker pull $BACKEND_IMAGE:latest

echo "Restarting containers..."
docker-compose -f /home/ec2-user/app/infra/docker-compose.yml down
docker-compose -f /home/ec2-user/app/infra/docker-compose.yml up -d

echo "Deployment complete!"
