pipeline {
    agent {
        docker {
            image 'cypress/base:18.16.0'
        }
    }

    triggers {
        pollSCM '* * * * *'
    }

    stages {
        stage('install') {
            steps {
                echo "Installing packages..."
                sh '''
                npm install
                '''
                echo "Installation complete."
            }
        }

        stage('build and test') {
            steps {
                echo "Building and running tests..."
                sh '''
                npm run cypress:e2e
                '''
                echo "Test run complete."
            }
        }
    }
}