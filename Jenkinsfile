pipeline {
    agent {
        docker {
            image 'cypress/base:18.16.1'
            args '-u root'
        }
    }

    triggers {
        cron('H 17 * * *')
    }

    options { buildDiscarder(logRotator(numToKeepStr: '7')) }

    stages {

        stage('environment setup') {
            steps {
                sh '''
                    apt-get -y update
                    apt-get -y install curl
                    corepack enable
                    corepack prepare pnpm@latest-8 --activate
                '''
            }
        }

        stage('install packages') {
            steps {
                echo "Installing packages..."
                sh '''
                pnpm install
                ./node_modules/.bin/cypress install
                ./node_modules/.bin/cypress verify
                '''
                echo "Installation complete."
            }
        }

        stage('build and test') {
            steps {
                echo "Building project and running tests..."
                sh 'npm run cypress:e2e'
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