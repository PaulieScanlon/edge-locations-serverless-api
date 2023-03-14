# Serverless Framework AWS Multi-Region Lambda

## Usage

This repo is for multi-region AWS Lambda Functions used in the [Edge](https://cockroachdb-edge-locations.vercel.app/) app.

- 🚀 API [https://api.crl-devrel.net/](https://api.crl-devrel.net/)
- 🚀 APP [https://cockroachdb-edge-locations.vercel.app/](https://cockroachdb-edge-locations.vercel.app/)

### Deployment (Prod)

Deployment for three regions is handled when a push or merge occurs on the `main` branch. This is handled by the a GitHub Action: `./.github/workflows/build-me.yaml`

### Deployment (Dev)

Deploy all three regions in one hit

```
npm run deploy
```

#### Deployment (Local | serverless)

The default region is `us-east-1`. Using the below deploys to the default region.

```shell
serverless deploy
```

#### Deployment (Local | serverless - regions)

To deploy to additional regions use the below.

```shell
serverless deploy --region eu-central-1
serverless deploy --region us-west-1

```

## Infrastructure

Each Lambda is deployed to a region. The region also requires a custom domain and ACM certificate mapping. Each API can then be used by Route 53 which routes traffic by geographical A records in Hosted Zones.

## Tech

- [Serverless Framework](https://www.serverless.com/framework/docs)
- [Serverless CLI](https://www.serverless.com/framework/docs/getting-started).
