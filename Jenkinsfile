pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'mustafadincer/ci-cdd'  // Docker Hub kullanıcı adı ve repo adı
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub deposundan kodu çekiyoruz
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Docker imajını oluşturuyoruz
                    docker.build("${DOCKER_HUB_REPO}:latest")
                }
            }
        }
        
	stage('Login to Docker Hub') {
    	    steps {
        	script {
            	// Docker Hub'a giriş yapıyoruz
                    withCredentials([usernamePassword(credentialsId: 'd-hub-pat', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
            	}
              }
           }
	}
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Docker imajını Docker Hub'a push ediyoruz
                    sh "docker push ${DOCKER_HUB_REPO}:latest"
                }
            }
        }
    }

    post {
        always {
            // İşlem sonunda çıkış yapıyoruz
            sh 'docker logout'
        }
    }
}
