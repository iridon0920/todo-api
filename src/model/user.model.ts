import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TodoModel } from './todo.model'

@Entity('user')
export class UserModel {
  @PrimaryColumn()
  id: string

  @Index({ unique: true })
  @Column()
  email: string

  @Column()
  name: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => TodoModel, (todo) => todo.user)
  todos: TodoModel[]
}
