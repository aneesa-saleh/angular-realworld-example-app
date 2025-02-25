pipeline {
    agent {
        dockerfile {
            args '-u root'
        }
        
    }

    triggers {
        cron('H 17 * * *')
    }

    options { buildDiscarder(logRotator(numToKeepStr: '7')) }

    stages {

        stage('install packages') {
            steps {
                echo "Installing packages..."
                sh 'pnpm install'
                echo "Verifying..."
                sh 'cypress verify'
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