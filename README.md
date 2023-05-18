# SPM_A2_Software
## Run in the server - check the main branch
### Prerequiste - set up docker 
'docker build -t backend --platform linux/amd64 .'

'docker tag backend luchen2001/spm:backend'

'docker push luchen2001/spm:backend '

'docker build -t react --platform linux/amd64 .'

'docker tag react luchen2001/spm:react'

'docker push luchen2001/spm:react'

## How to run
'in the cloud server, run: '

'docker-compose up -d'

## Run locally - check the local_version branch
'npm start'
'python3 main.py'
