import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserModel } from './user.model'

@Entity('todo')
export class TodoModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  userId: number

  @ManyToOne(() => UserModel, (user) => user.todos)
  user: UserModel
}
