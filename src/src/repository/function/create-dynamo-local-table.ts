import { dbClient } from './db-client'
import { CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb'

export const USERS_TABLE_NAME = 'users'
export const TODOS_TABLE_NAME = 'todos'

export const createDynamoLocalTable = async () => {
  const command = new ListTablesCommand({})
  const output = await dbClient.send(command)
  if (!output.TableNames.includes(USERS_TABLE_NAME)) {
    await createUsersTable()
  }
  if (!output.TableNames.includes(TODOS_TABLE_NAME)) {
    await createTodosTable()
  }
}

const createUsersTable = async () => {
  const createCommand = new CreateTableCommand({
    TableName: USERS_TABLE_NAME,
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
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

const createTodosTable = async () => {
  const command = new CreateTableCommand({
    TableName: TODOS_TABLE_NAME,
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    StreamSpecification: {
      StreamEnabled: false,
    },
  })
  await dbClient.send(command)
}
