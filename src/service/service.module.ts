import { Module } from '@nestjs/common'
import { CreateUserService } from './create-user.service'
import { RepositoryModule } from '../repository/repository.module'
import { UpdateUserService } from './update-user.service'
import { DeleteUserService } from './delete-user.service'

@Module({
  imports: [RepositoryModule],
  providers: [CreateUserService, UpdateUserService, DeleteUserService],
  exports: [CreateUserService, UpdateUserService, DeleteUserService],
})
export class ServiceModule {}
