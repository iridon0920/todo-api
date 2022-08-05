import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { UsersRepository } from './users.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class RepositoryModule {}
