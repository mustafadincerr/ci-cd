pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Docker Hub kullanıcı adı ve şifre tanımlı olmalı
        IMAGE_NAME = 'your_dockerhub_username/backend-app' // Docker Hub için imaj adı
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/yourusername/yourrepo.git', branch: 'master'
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    // Docker Compose ile containerları başlatıyoruz
                    sh 'docker-compose up -d'
                    // Testleri çalıştırıyoruz
                    sh 'docker-compose exec backend npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Docker imajı oluşturuyoruz
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_ID} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'DOCKERHUB_CREDENTIALS') {
                        sh "docker push ${IMAGE_NAME}:${env.BUILD_ID}"
                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    // Production dağıtımı için gereken komutlar
                    sh 'docker-compose -f docker-compose.prod.yml up -d'
                }
            }
        }
    }

    post {
        always {
            script {
                // Temizlik işlemi - Çalışan containerları durdur ve kaldır
                sh 'docker-compose down'
            }
        }
    }
}
