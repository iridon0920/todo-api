import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { CreateTodoService } from '../service/todo/create-todo.service'
import { CreateTodoParam } from '../dto/request/todo/create-todo-param'
import { TodoResponse } from '../dto/response/todo/todo-response'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AuthUserParam } from '../dto/request/auth/auth-user-param'
import { convertToTodoResponse } from '../domain/todo/function/convert-to-todo-response'
import { UpdateTodoParam } from '../dto/request/todo/update-todo-param'
import { UpdateTodoService } from '../service/todo/update-todo.service'

@Controller('todos')
export class TodosController {
  constructor(
    private readonly createTodoService: CreateTodoService,
    private readonly updateTodoService: UpdateTodoService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() request: AuthUserParam,
    @Param('id', ParseIntPipe) id: number,
    @Body() param: UpdateTodoParam,
  ): Promise<TodoResponse> {
    const todo = await this.updateTodoService.execute(
      id,
      param,
      request.user.userId,
    )
    return convertToTodoResponse(todo)
  }
}
