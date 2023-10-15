# AWS Serverless TS

Plantilla AWS serverless con arquitectura hexagonal + JS + Nodejs

## Usage npm

```bash
npm run local # Desplegar app en local
npm run deploy # Desplegar app en dashboard serverless
```

## Usage serverless

```bash
# Dashboard serverless
https://app.serverless.com/alexchristianqr/apps

serverless offline # Desplegar app en local
serverless deploy # Desplegar app en dashboard serverless
serverless remove # Remover app en dashboard serverless
```

## Docs

https://www.serverless.com/framework/docs/providers/aws/cli-reference

```bash
serverless create --template [aws-nodejs] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/create
serverless config credentials --provider [aws] --key [1234] --secret [5678] --profile [default] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials

serverless offline

serverless deploy list # https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy-list
serverless deploy # https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy
serverless deploy --stage [production] --region [eu-central-1]
serverless deploy --package [/path/to/package/directory]
serverless deploy function --function [functionName] --stage [dev] --region [us-east-1] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy-function

serverless remove # https://www.serverless.com/framework/docs/providers/aws/cli-reference/remove

serverless logs -f [functionName] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/logs
serverless info # https://www.serverless.com/framework/docs/providers/aws/cli-reference/info

serverless invoke --function [functionName] --stage [dev] --region [us-east-1] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke
serverless invoke local --function [functionName] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local

serverless package # https://www.serverless.com/framework/docs/providers/aws/cli-reference/package
serverless package --package [/path/to/package/directory]
serverless package --stage [production] --region [eu-central-1]

serverless login # https://www.serverless.com/framework/docs/providers/aws/cli-reference/login

serverless metrics --function [functionName] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/metrics
serverless metrics --startTime [2016-01-01] --endTime [2016-01-02]

serverless plugin list # https://www.serverless.com/framework/docs/providers/aws/cli-reference/plugin-list
serverless plugin search --query [sqs]
serverless plugin install --name [pluginName]
serverless plugin uninstall --name [pluginName]

serverless print # https://www.serverless.com/framework/docs/providers/aws/cli-reference/print
serverless generate-event --type [aws:sqs] # https://www.serverless.com/framework/docs/providers/aws/cli-reference/generate-event
```