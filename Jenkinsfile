pipeline {
    
    environment {
        DYNAMO_ACCESS_KEY = credentials('dynamo-access-key')
        DYNAMO_SECRET_ACCESS_KEY = credentials('dynamo-secret-key')
        DYNAMO_REGION = 'us-east-1'
        NAME = 'user-microservice' 
        PORT = '443'
        PAYLOAD_AGW_KEY = 'key-rs256-2048-pry20231065-dev'
        PAYLOAD_EXP_TIME = '604800'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t ${NAME} ."
            }
        }

        stage('Deploy') {
            steps {
                sh "docker run -d --name ${NAME}-container -p ${PORT}:${PORT} -e DYNAMO_ACCESS_KEY=${DYNAMO_ACCESS_KEY} -e DYNAMO_SECRET_ACCESS_KEY=${DYNAMO_SECRET_ACCESS_KEY} -e DYNAMO_REGION=${DYNAMO_REGION} -e PORT=${PORT} -e PAYLOAD_AGW_KEY=${PAYLOAD_AGW_KEY} -e PAYLOAD_EXP_TIME=${PAYLOAD_EXP_TIME} user-microservice"
            }
        }
    }
}