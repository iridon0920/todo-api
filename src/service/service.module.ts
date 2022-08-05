import { Module } from '@nestjs/common'
import { CreateUserService } from './create-user.service'
import { RepositoryModule } from '../repository/repository.module'

@Module({
  imports: [RepositoryModule],
  providers: [CreateUserService],
  exports: [CreateUserService],
})
export class ServiceModule {}
