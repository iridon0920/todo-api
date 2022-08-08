import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserModel } from './user.model'

@Entity('todo')
export class TodoModel {
  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  userId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => UserModel, (user) => user.todos)
  user: UserModel
}
