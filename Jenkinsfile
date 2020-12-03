def image_id = ""
def container_id = ""
def api_routes = ["get_all_stocks"]
def abort = false

pipeline {
    agent any

    stages {
        stage('Build image for test') {
            when {
	            branch 'feature' && (abort != true)
	        }
            steps {
                script {
                    image_id = sh(script:'docker build -f ./app/Dockerfile-Backend ./app/',returnStdout:true) 
                    if (image == "")
                    {
                        echo 'Could not build Backend image, ABORT pipeline'
                        abort = true
                        currentBuild.result = 'ABORTED'
                        error('Aborting...')
                    }
                }
            }
        }
        stage('Test') {
            when {
                branch 'feature' && (abort != true)
            }
            steps {
                script {
                    container_id = sh(script:"docker run -d --rm -p 100:5000 " + image_id,returnStdout:true)
                    container_status = sh(script:"docker inspect " + container_id,returnStdout:true)
                    if (container_status.contains("running"))
                    {
                        for (route in api_routes)
                        {
                            def url = 'http://localhost:100/' + route
                            def response = httpRequest url
                            if (response.status != 200)
                            {
                                echo "Could not send GET request to ${url}, ABORT pipeline"
                                abort = true
                                currentBuild.result = 'ABORTED'
                                error('Aborting...')
                            }
                        }
                        if (abort == false)
                        {
                            echo "Passed all HTTP connectivity tests successfully"
                        }
                    }
                    else
                    {
                        echo "Container failed to run, ABORT pipeline"
                        abort = true
                        currentBuild.result = 'ABORTED'
                        error('Aborting...')
                    }
                }
            }
        }
        /*stage('Push to Master') {
            when {
                branch 'feature' && (abort != true)
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'b09400db-9f0b-4de4-bb24-1f06515eb59a', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                            sh 'git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/RomJacoby/MyFinance.com'
                }
            }
        }*/
	    stage('Build image for deploy') {
            when {
                branch 'master'
            }
            steps {
                echo 'Building for deploy'
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying....'
            }
        }
        //add cleanup
    }
    post {
        success{
           sh "docker kill ${container_id}"
           sh "docker rmi -f ${image_id}"
        }
    }
}
