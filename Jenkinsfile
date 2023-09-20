pipeline {
    agent { dockerfile true }

    triggers {
        cron('H 17 * * *')
    }

    stages {

        stage('install packages') {
            steps {
                echo "Installing packages..."
                sh '''
                npm install
                '''
                echo "Installation complete."
            }
        }

        stage('verify') {
            steps {
                echo "Verifying packages..."
                sh '''
                cypress verify
                '''
                echo "Verification successful."
            }
        }

        stage('build and test') {
            steps {
                echo "Building and running tests..."
                sh '''
                npm run cypress:e2e:chrome
                '''
                echo "Test run complete."
            }
        }
    }
}