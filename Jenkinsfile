
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '435957166878'
        ECR_REGISTRY = '435957166878.dkr.ecr.us-east-1.amazonaws.com'
        COMPOSE_PROJECT_NAME = 'internship-management-system-practice'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Downloading application source code from GitHub'
                checkout scm
            }
        }

        stage('Generate Image Tag') {
            steps {
                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short=12 HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Docker image tag: ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    set -e

                    for SERVICE in user-service product-service order-service
                    do
                        echo "Building $SERVICE"

                        docker build \
                          -t "$ECR_REGISTRY/$SERVICE:$IMAGE_TAG" \
                          "./$SERVICE"
                    done
                '''
            }
        }

        stage('Push Images to AWS ECR') {
            steps {
                sh '''
                    set -e

                    aws ecr get-login-password \
                      --region "$AWS_REGION" |
                    docker login \
                      --username AWS \
                      --password-stdin "$ECR_REGISTRY"

                    for SERVICE in user-service product-service order-service
                    do
                        echo "Pushing $SERVICE to ECR"

                        docker push "$ECR_REGISTRY/$SERVICE:$IMAGE_TAG"
                    done
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    set -e

                    docker compose \
                      -p "$COMPOSE_PROJECT_NAME" \
                      -f docker-compose.ecr.yml pull

                    docker compose \
                      -p "$COMPOSE_PROJECT_NAME" \
                      -f docker-compose.ecr.yml up -d \
                      --remove-orphans \
                      --wait \
                      --wait-timeout 180
                '''
            }
        }

        stage('Application Health Check') {
            steps {
                sh '''
                    set -e

                    for SERVICE in users products orders
                    do
                        echo "Checking $SERVICE service"

                        SUCCESS=0

                        for ATTEMPT in $(seq 1 20)
                        do
                            if curl -fsS \
                              "http://localhost/$SERVICE/health"
                            then
                                SUCCESS=1
                                break
                            fi

                            echo "Waiting for $SERVICE..."
                            sleep 5
                        done

                        if [ "$SUCCESS" -ne 1 ]; then
                            echo "$SERVICE health check failed"
                            exit 1
                        fi
                    done

                    echo "All three services are healthy"
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully!'
            echo "Deployed image tag: ${env.IMAGE_TAG}"
        }

        failure {
            echo 'CI/CD pipeline failed. Check the stage logs.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}
