pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('mustafadincer') // Docker Hub kimlik bilgisi ID'si
        IMAGE_NAME = 'mustafadincer/ci-cdd' // Docker Hub imaj adı
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/mustafadincerr/ci-cd.git', branch: 'master'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Docker imajı oluşturma
                sh "docker build -t ${IMAGE_NAME}:${env.BUILD_ID} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Docker Hub'a push etme
                    docker.withRegistry('', 'DOCKERHUB_CREDENTIALS') {
                        sh "docker push ${IMAGE_NAME}:${env.BUILD_ID}"
                    }
                }
            }
        }
    }
}
