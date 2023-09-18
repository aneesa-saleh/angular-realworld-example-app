pipeline {
   agent any

   tools {nodejs "node v18.17.1"}

   environment {
       CHROME_BIN = '/bin/google-chrome'
      
   }

   stages {
       stage('Dependencies') {
           steps {
               sh 'npm i'
           }
       }
       stage('e2e Tests') {
            steps {
                sh 'npm run cypress:e2e'
            }
       }
   }
}