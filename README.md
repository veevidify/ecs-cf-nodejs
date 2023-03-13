```
cp .env.example .env
cp docker-compose.yml.example docker-compose.yml
cp ops/staging/params.json.example ops/staging/params.json
```

```
aws cloudformation deploy --template-file ./ops/staging/stack.yaml --stack-name EcsHttpNginxNode --parameter-overrides file://ops/staging/params.json --capabilities CAPABILITY_IAM --output json
```

```
aws cloudformation delete-stack --stack-name EcsHttpNginxNode
```

```
EcsAlb-1968953453.ap-southeast-2.elb.amazonaws.com
(A Record)
```
