pipeline {
    agent {
        docker {
            image 'cypress/base:18.16.1'
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

        stage('verify') {
            steps {
                echo "Verifying packages..."
                sh '''
                ./node_modules/.bin/cypress verify
                '''
                echo "Packages verified."
            }
        }

        stage('build and test') {
            steps {
                echo "Building and running tests..."
                sh '''
                npm run cypress:e2e
                printf "\n\nJUNI RESULTS\n\n"
                cat ./cypress/results/junit/results.xml
                printf "\n\n"
                '''
                echo "Test run complete."
            }
        }
    }
}