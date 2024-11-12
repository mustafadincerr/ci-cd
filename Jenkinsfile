pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('mustafadincer') // Docker Hub kullanıcı adı ve şifre tanımlı olmalı
        IMAGE_NAME = 'mustafadincer/backend-app' // Docker Hub için imaj adı
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/mustafadincerr/ci-cd.git', branch: 'master'
            }
        }

        stage('Build and Test') {
            steps {
                node {
                    // Docker Compose ile containerları başlatıyoruz
                    sh 'docker-compose up -d'
                    // Testleri çalıştırıyoruz
                    sh 'docker-compose exec backend npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                node {
                    // Docker imajı oluşturuyoruz
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_ID} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                node {
                    script {
                        // Docker Hub'a bağlanıyoruz ve imajı pushlıyoruz
                        docker.withRegistry('', 'DOCKERHUB_CREDENTIALS') {
                            sh "docker push ${IMAGE_NAME}:${env.BUILD_ID}"
                        }
                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                node {
                    // Production dağıtımı için gereken komutlar
                    sh 'docker-compose -f docker-compose.prod.yml up -d'
                }
            }
        }
    }

    post {
        always {
            node {
                script {
                    // Temizlik işlemi - Çalışan containerları durdur ve kaldır
                    sh 'docker-compose down'
                }
            }
        }
    }
}
