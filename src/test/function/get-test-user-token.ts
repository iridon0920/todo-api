import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'

/**
 * テストに使用するユーザを作成し、そのJWTを取得する
 */
export const getTestUserToken = async (app: INestApplication) => {
  const createResponse = await request(app.getHttpServer()).post('/user').send({
    email: 'testtest@example.com',
    name: 'テストテスト',
    password: 'password',
  })

  const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      userId: createResponse.body.id,
      password: 'password',
    })
  return loginResponse.body.access_token
}
