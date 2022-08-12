import { dbClient } from './db-client'
import { CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb'

export const TABLE_NAME = 'todo-api'

export const createDynamoLocalTable = async () => {
  const command = new ListTablesCommand({})
  const output = await dbClient.send(command)
  if (!output.TableNames.includes(TABLE_NAME)) {
    const createCommand = new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' },
        { AttributeName: 'sk', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' },
        { AttributeName: 'email', AttributeType: 'S' },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'EmailIndex',
          KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      StreamSpecification: {
        StreamEnabled: false,
      },
    })
    await dbClient.send(createCommand)
  }
}
