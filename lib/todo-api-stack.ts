import * as cdk from "aws-cdk-lib";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { TABLE_NAME } from "../src/src/repository/function/create-dynamo-local-table";
import * as dotenv from "dotenv";

dotenv.config();

export class TodoApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoTable = new Table(this, "dynamoTable", {
      partitionKey: {
        name: "pk",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: AttributeType.STRING,
      },
      tableName: TABLE_NAME,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    dynamoTable.addGlobalSecondaryIndex({
      indexName: "EmailIndex",
      partitionKey: {
        name: "email",
        type: AttributeType.STRING,
      },
    });

    const lambdaLayer = new lambda.LayerVersion(this, "NestAppLambdaLayer", {
      code: lambda.Code.fromAsset("src/node_modules"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
    });

    const appLambda = new lambda.Function(this, "NestAppLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("src/dist"),
      handler: "main.handler",
      layers: [lambdaLayer],
      environment: {
        NODE_PATH: "$NODE_PATH:/opt",
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
        JWT_SECRET: process.env.JWT_SECRET ?? "",
        DYNAMODB_REGION: process.env.DYNAMODB_REGION ?? "ap-northeast-1",
      },
      timeout: Duration.seconds(30),
    });
    dynamoTable.grantReadWriteData(appLambda);

    const restApi = new apigw.RestApi(this, "NestAppApiGateway", {
      restApiName: "TodoApiGw",
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
    });

    restApi.root.addProxy({
      defaultIntegration: new apigw.LambdaIntegration(appLambda),
      anyMethod: true,
    });
  }
}
