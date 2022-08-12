import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const dbConfig: DynamoDBClientConfig = {
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: process.env.DYNAMODB_REGION,
}

const credentialsConfig: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY ?? '',
  },
  ...dbConfig,
}

export const dbClient = new DynamoDBClient(
  process.env.LOCAL_RUNNING ? credentialsConfig : dbConfig,
)
export const documentClient = DynamoDBDocumentClient.from(dbClient)
