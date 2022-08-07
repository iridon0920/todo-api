import { Module } from '@nestjs/common'
import { CreateUserService } from './create-user.service'
import { RepositoryModule } from '../repository/repository.module'
import { UpdateUserService } from './update-user.service'

@Module({
  imports: [RepositoryModule],
  providers: [CreateUserService, UpdateUserService],
  exports: [CreateUserService, UpdateUserService],
})
export class ServiceModule {}
