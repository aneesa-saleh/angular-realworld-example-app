pipeline {
    agent { dockerfile true }

    stages {

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