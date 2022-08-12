import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configure as serverlessExpress } from '@vendia/serverless-express'
import { Callback, Context, Handler } from 'aws-lambda'
import { createDynamoLocalTable } from './repository/function/create-dynamo-local-table'

let server: Handler

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.init()

  const expressApp = app.getHttpAdapter().getInstance()
  return serverlessExpress({ app: expressApp })
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap())
  return server(event, context, callback)
}

async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
if (process.env.LOCAL_RUNNING) {
  bootstrapLocal()
  createDynamoLocalTable()
}
