import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from './model/user.model'
import { TodoModel } from './model/todo.model'
import { ControllerModule } from './controller/controller.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [UserModel, TodoModel],
      synchronize: true,
    }),
    ControllerModule,
  ],
})
export class AppModule {}
