import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { CreateTodoService } from '../service/todo/create-todo.service'
import { CreateTodoParam } from '../dto/request/todo/create-todo-param'
import { TodoResponse } from '../dto/response/todo/todo-response'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AuthUserParam } from '../dto/request/auth/auth-user-param'
import { convertToTodoResponse } from '../domain/todo/function/convert-to-todo-response'

@Controller('todos')
export class TodosController {
  constructor(private readonly createTodoService: CreateTodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() request: AuthUserParam,
    @Body() param: CreateTodoParam,
  ): Promise<TodoResponse> {
    const todo = await this.createTodoService.execute(
      request.user.userId,
      param,
    )
    return convertToTodoResponse(todo)
  }
}
