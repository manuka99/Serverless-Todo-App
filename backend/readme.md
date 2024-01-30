<!-- Register a user -->

aws cognito-idp sign-up --region us-east-1 --client-id 1uv5bvmdhjjiclielv6dphi6fm --username admin@gmail.com --password password123

<!-- Confirm user registration -->

aws cognito-idp admin-confirm-sign-up --region us-east-1 --user-pool-id us-east-1_mpBMqUTZm --username admin@gmail.com

<!-- Authenticate (get tokens) -->

aws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id 1uv5bvmdhjjiclielv6dphi6fm --auth-parameters USERNAME=admin@gmail.com,PASSWORD=password123