import {
  Body,
  Controller,
  Delete,
  Get,
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
import { GetTodoService } from '../service/todo/get-todo.service'
import { DeleteTodoService } from '../service/todo/delete-todo.service'

@Controller('todos')
export class TodosController {
  constructor(
    private readonly createTodoService: CreateTodoService,
    private readonly updateTodoService: UpdateTodoService,
    private readonly getTodoService: GetTodoService,
    private readonly deleteTodoService: DeleteTodoService,
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<TodoResponse> {
    const todo = await this.getTodoService.execute(id)
    return convertToTodoResponse(todo)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Request() request: AuthUserParam,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.deleteTodoService.execute(id, request.user.userId)
  }
}
