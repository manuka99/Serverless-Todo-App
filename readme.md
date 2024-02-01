# AWS Serverless Todo App

## Overview
This project is a Todo application built on the AWS serverless stack. Users can authenticate using AWS Cognito, add and delete Todo items, and the application stores data in DynamoDB. The infrastructure is defined as code (IAC) using the Serverless Framework with TypeScript, making it easy to deploy resources across different projects and regions.

Demo :earth_asia: https://serverless-todo-app-mu.vercel.app/

## Technologies

### Backend:

1. AWS Lambda (Node.js in TypeScript)
2. Serverless Framework
3. AWS API Gateway
4. AWS Cognito for user authentication
5. DynamoDB for data storage

### Frontend:

1. Next.js (TypeScript)
2. Next Auth to authenticate through AWS Cognito
3. Tailwind CSS for styling

## Project Structure
- `/backend`: Contains the serverless backend code.
    - `/serverless`: Serverless Framework configuration.
    - `/src`: Lambda function source code.
        - `/dao`: Holds Data Access Object (DAO) related code.
        - `/functions`: Contains Lambda functions or serverless functions.
        - `/libs`: Libraries or shared code used across different parts of the project.
        - `/types`: TypeScript type definitions.

- `/frontend`: Contains the Next Js frontend code.
    - `/public`: Static assets that need to be served as-is by the server.
    - `/src`: The source code directory.
        - `/app`: Main application code.
        - `/api`: Server-side API endpoints.
        - `/models`: Data models or interfaces used within the application.
        - `/services`: Services or utility functions, such as Axios-based API interaction.

## Deployment

### Backend Deployment:

1. Navigate to the `/backend` directory.
2. Run `yarn install` to install dependencies.
3. Run `sls deploy` to deploy the backend resources to AWS.

### Frontend Deployment:

1. Navigate to the `/frontend` directory.
2. Run `yarn install` to install dependencies.
3. Update the NEXT_PUBLIC_API_URL in the .env file with the API Gateway URL.

```
NEXT_PUBLIC_API_URL:your-api-gateway-stage-url
```
4. Run `yarn build` to build the Next.js app.
5. Run `yarn start` to start the application.

### Accessing the Application
After deployment, visit the provided URL for the Next.js app to access the Todo application. Users will be prompted to authenticate using AWS Cognito before being able to add or delete Todo items.

## Codebase Maintenance
- The Serverless Framework definition is done using TypeScript, avoiding YAML for better readability.
- Engineers can understand and maintain the code easily as it grows.
- DynamoDB integration for data storage is seamlessly handled by the backend Lambda functions.

## Feedback and Questions
If you have any feedback or questions, please feel free to reach out to me. I hope you enjoy exploring the AWS Serverless Todo App!

[Manuka Yasas] [manukayasas99@gmail.com]

![signin](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/1-signin.png?raw=true)
![signin](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/2-signin.png?raw=true)
![signin](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/3-signin.png?raw=true)
![loading](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/4-loading.png?raw=true)
![no todos](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/8-no-todos.png?raw=true)
![update todos](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/5-add-todo.png?raw=true)
![delete todo](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/6-delete-todo.png?raw=true)
![error handling](https://github.com/manuka99/Serverless-Todo-App/blob/master/images/7-error-handling.png?raw=true)
