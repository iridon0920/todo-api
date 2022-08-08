import { TestingModule } from '@nestjs/testing'

/**
 * Nestアプリケーションを起動して返す
 */
export const getInitApp = async (module: TestingModule) => {
  const app = module.createNestApplication()
  await app.init()

  return app
}
