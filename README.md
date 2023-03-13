# Serverless Framework AWS Multi-Region Lambda

## Usage

This framework can be used to deploy AWS Lambdas for use with AWS API Gateway. Built with: [Serverless Framework](https://www.serverless.com/framework/docs) and the [Serverless CLI](https://www.serverless.com/framework/docs/getting-started).

This example has been deployed behind a Route 53 registered domain:

- 🚀 [https://api.crl-devrel.net/](https://api.crl-devrel.net/)

Additional routes may be added for the following:

- /create
- /read
- /delete

### Deployment

Deploy all three regions is one hit

```
npm run deploy

```

### Deployment (serverless)

The default region is `us-east-1`. Using the below deploys to the default region.

```shell
serverless deploy
```

#### Deployment (serverless - regions)

To deploy to additional regions use the below.

```shell
serverless deploy --region eu-central-1
serverless deploy --region us-west-1

```

## Infrastructure

Each Lambda is deployed to a region. The region also requires a custom domain and ACM certificate mapping. Each API can then be used by Route 53 which routes traffic by geographical A records in Hosted Zones.
