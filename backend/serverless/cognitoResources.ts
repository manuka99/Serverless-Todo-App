import type { AWS } from "@serverless/typescript";
const CognitoResources: AWS["resources"]["Resources"] = {
  CognitoUserPool: {
    Type: "AWS::Cognito::UserPool",
    Properties: {
      UserPoolName: "${sls:stage}-${self:service}-user-pool",
      UsernameAttributes: ["email"],
      AutoVerifiedAttributes: ["email"],
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: false,
          RequireNumbers: false,
          RequireUppercase: false,
          RequireSymbols: false,
        },
      },
    },
  },

  CognitoUserPoolClient: {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      ClientName: "${sls:stage}-${self:service}-user-pool-client",
      UserPoolId: { Ref: "CognitoUserPool" },
      ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH", "USER_PASSWORD_AUTH"],
      GenerateSecret: false,
      SupportedIdentityProviders: ["COGNITO"],
    },
  },
};
export default CognitoResources;
