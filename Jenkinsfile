pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'node-18'  // Use the Node.js tool configured in Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'Stagging', url: 'https://github.com/wecodes-in/jwt-token.git'
            }
        }

   stage('Install Dependencies') {
    steps {
        sh '''
        #!/bin/bash
        npm install
        '''
    }
}

}

        stage('Build React Vite App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['jenkins-ec2-key']) {
                    sh '''
                    scp -r dist/* ubuntu@ip-172-31-30-137:/var/www/html/
                    ssh ubuntu@ip-172-31-30-137 "sudo systemctl restart nginx"
                    '''
                }
            }
        }
    }
}
