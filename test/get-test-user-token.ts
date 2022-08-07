import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'

/**
 * テストに使用するユーザを作成し、そのJWTを取得する
 */
export const getTestUserToken = async (app: INestApplication) => {
  await request(app.getHttpServer())
    .post('/user')
    .send({
      email: 'test@example.com',
      name: 'テスト',
      password: 'password',
    })
    .expect(201)
    .expect({ id: 1, email: 'test@example.com', name: 'テスト' })
  const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password',
    })
  return loginResponse.body.access_token
}
