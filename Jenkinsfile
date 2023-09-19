pipeline {
    agent {
        docker {
            image 'cypress/base:18.16.1'
            args '-u root'
        }
    }

    triggers {
        cron('0 17 * * *')
    }

    stages {

        stage('environment setup') {
            steps {
                echo "Setting up environment..."
                sh '''
                apt-get -y update
                apt-get -y install curl
                curl --version
                '''
                echo "Environment setup complete."
            }
        }

        stage('install packages') {
            steps {
                echo "Installing packages..."
                sh '''
                npm install
                ./node_modules/.bin/cypress install
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
                echo "Verification successful."
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

        stage('publish test results') {
            environment {
                ZEPHYR_SCALE_TOKEN = credentials('jenkins-zephyr-scale-token')
            }
            
            steps {
                echo "Publishing test results to zephyr..."
                sh '''
                chmod +x ./zephyr.sh
                ./zephyr.sh
                '''
                echo "Test publish done."
            }
        }
    }
}