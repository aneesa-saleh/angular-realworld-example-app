pipeline {
    agent {
        dockerfile true
    }

    triggers {
        cron('0 17 * * *')
    }

    stages {
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
                echo "Verifying packages and environment..."
                sh '''
                curl --version
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