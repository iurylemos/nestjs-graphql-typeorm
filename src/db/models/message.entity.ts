import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

//Esse é o Schema e o repo é o model

@ObjectType()
@Entity({ name: 'messages' })
export default class Message {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @Field(() => User)
  user: User;

  //Varias mensagens retornar 1 user..
  //Ele primeiro faz o relacionamento
  @ManyToOne(() => User,
    user => user.messageConnection,
    { primary: true }
  )

  //E depois ele faz o Join
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>

  // Associations
  @OneToMany(() => Message, message => message.userConnection)
  bookConnection: Promise<Message[]>;

}