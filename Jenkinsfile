pipeline {
    agent {
        docker {
            image 'cypress/included:12.12.0'
        }
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