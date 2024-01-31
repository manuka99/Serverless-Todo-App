<!-- Register a user -->

aws cognito-idp sign-up --region us-east-1 --client-id 11oj1mh98gars2aekqei3v9lhc --secret-hash 5sDpcr68bLYWtBGVSVj/iYuhIvrUDBHJSjozyg7OMQk= --username admin@gmail.com --password password123 

<!-- Confirm user registration -->

aws cognito-idp admin-confirm-sign-up --region us-east-1 --user-pool-id us-east-1_2UGycnQm3 --username admin@gmail.com

<!-- Authenticate (get tokens) -->

aws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id 11oj1mh98gars2aekqei3v9lhc --auth-parameters USERNAME=admin@gmail.com,PASSWORD=password123,SECRET_HASH=5sDpcr68bLYWtBGVSVj/iYuhIvrUDBHJSjozyg7OMQk=