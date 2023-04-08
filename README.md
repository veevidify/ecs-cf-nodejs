## Cloudformation stack
- [Cloudformation stack](#cloudformation-stack)
- [1. Local setup](#1-local-setup)
  - [a. Getting started](#a-getting-started)
  - [b. Testing node app](#b-testing-node-app)
  - [c. Running local docker compose stack](#c-running-local-docker-compose-stack)
- [2. CI/CD (WIP)](#2-cicd-wip)
  - [a. Infra](#a-infra)
  - [b. Nginx config or App code changes](#b-nginx-config-or-app-code-changes)
  - [c. Destroy](#c-destroy)
- [3. Manually testing cloud stack](#3-manually-testing-cloud-stack)
  - [a. Prerequisites](#a-prerequisites)
  - [b. Build, tag \& push to ECR](#b-build-tag--push-to-ecr)
  - [c. Deploy to AWS](#c-deploy-to-aws)

---

## 1. Local setup
### a. Getting started
- Pull the repo
```console
$
git clone git@github.com:veevidify/ecs-cf-nodejs.git
cd ecs-cf-nodejs
```
- Start with configuration files
```console
$
cp .env.example .env
cp docker-compose.yml.example docker-compose.yml
cp ops/staging/params.json.example ops/staging/params.json
```

### b. Testing node app
- Get deps & start
```console
$
npm clean-install
npm run start-dev
```
output:
```
> ecs-cf-nodejs@1.0.0 start-dev
> ts-node src/server.ts

{
  level: 'info',
  message: '[local] App is listening on port 8000',
  extra: {},
  timestamp: '2023-03-18T01:40:36.114Z'
}
```
```console
$
curl localhost:8000/api/ping
```
console output:
```
pong%
```
server output:
```
{
  level: 'info',
  message: 'Send response',
  extra: { statusCode: 200 },
  timestamp: '2023-03-18T01:41:31.947Z'
}
```

### c. Running local docker compose stack
- Start the stack
```console
$
docker compose up -d
```
output:
```
[+]Running 3/3
 ⠿ Network ecs-cf-nodejs_node-bridge    Created    0.0s
 ⠿ Container node-http                  Started    0.5s
 ⠿ Container ecs-cf-nodejs-revproxy-1   Started    0.5s
```
```console
$
docker compose logs -f
```
console output:
```
node-http                 |
node-http                 | > ecs-cf-nodejs@1.0.0 start-dev
node-http                 | > ts-node src/server.ts
node-http                 |
node-http                 | {
node-http                 |   level: 'info',
node-http                 |   message: '[local] App is listening on port 8000',
node-http                 |   extra: {},
node-http                 |   timestamp: '2023-03-18T01:44:37.664Z'
node-http                 | }
ecs-cf-nodejs-revproxy-1  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
ecs-cf-nodejs-revproxy-1  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
ecs-cf-nodejs-revproxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
ecs-cf-nodejs-revproxy-1  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
ecs-cf-nodejs-revproxy-1  | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
ecs-cf-nodejs-revproxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
ecs-cf-nodejs-revproxy-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
ecs-cf-nodejs-revproxy-1  | /docker-entrypoint.sh: Configuration complete; ready for start up
```
```console
$
curl localhost/api/ping
```
console output:
```
pong%
```
stack output:
```
node-http                 | {
node-http                 |   level: 'info',
node-http                 |   message: 'Recv request',
node-http                 |   extra: {
node-http                 |     url: '/ping',
node-http                 |     method: 'GET',
node-http                 |     headers: {
node-http                 |       connection: 'upgrade',
node-http                 |       host: 'localhost',
node-http                 |       'x-forwarded-for': '172.31.0.1',
node-http                 |       'user-agent': 'curl/7.81.0',
node-http                 |       accept: '*/*'
node-http                 |     }
node-http                 |   },
node-http                 |   timestamp: '2023-03-18T01:47:22.434Z'
node-http                 | }
ecs-cf-nodejs-revproxy-1  | 172.31.0.1 - - [18/Mar/2023:01:47:22 +0000] "GET /api/ping HTTP/1.1" 200 4 "-" "curl/7.81.0"
node-http                 | {
node-http                 |   level: 'info',
node-http                 |   message: 'Send response',
node-http                 |   extra: { statusCode: 200 },
node-http                 |   timestamp: '2023-03-18T01:47:22.438Z'
node-http                 | }
```
- Stop or destroy the compose stack:
```console
$
docker compose stop
```
output:
```
[+] Running 2/2
 ⠿ Container node-http                  Stopped     0.7s
 ⠿ Container ecs-cf-nodejs-revproxy-1   Stopped     0.3s
```
```console
$
docker compose down
```
output:
```
[+] Running 3/3
 ⠿ Container node-http                  Removed     0.0s
 ⠿ Container ecs-cf-nodejs-revproxy-1   Removed     0.0s
 ⠿ Network ecs-cf-nodejs_node-bridge    Removed     0.1s
```

---

## 2. CI/CD (WIP)
### a. Infra

### b. Nginx config or App code changes

### c. Destroy

---

## 3. Manually testing cloud stack
### a. Prerequisites
- Have created ECR repositories for `nginx` and `node` builds. These ECR endpoints should exist:
  - `123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/node-build`
  - `123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/nginx-build`
- Have a VPC & 2 subnets within.
- Have selected an Amazon Linux AMI to run your stack.
- Fill these values accordingly in `ops/staging/params.json`

### b. Build, tag & push to ECR
- Docker login to ECR:
```console
$
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-southeast-2.amazonaws.com
```
output:
```
...
Login Succeeded
```

- Build & tag & push manually
```console
$
docker build -t node-docker -f ops/resources/node/Dockerfile .
docker tag node-docker:latest 123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/node-build
docker push 123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/node-build
```

```console
$
docker build -t nginx-docker -f ops/resources/nginx/Dockerfile ./ops/resources/nginx
docker tag nginx-docker:latest 123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/nginx-build
docker push 123456789012.dkr.ecr.ap-southeast-2.amazonaws.com/nginx-build
```

### c. Deploy to AWS
- Deploy manually
```console
$
aws cloudformation deploy --template-file ./ops/staging/stack.yaml --stack-name EcsHttpNginxNode --parameter-overrides file://ops/staging/params.json --capabilities CAPABILITY_IAM --output json
```

- Testing e2e by hitting the ELB's DNS
```console
$
curl EcsAlb-1234567890.ap-southeast-2.elb.amazonaws.com/api/ping
```

- Delete stack manually
```console
$
aws cloudformation delete-stack --stack-name EcsHttpNginxNode
```

