import { Args, Mutation, Query, Resolver, Parent, ResolveField, Subscription } from '@nestjs/graphql';
import User from 'src/db/models/user.entity';
import RepoService from 'src/repo.service';
import Message from 'src/db/models/message.entity';
import MessageInput, { MessageDeleteInput } from './input/message.input';
import { PubSub } from 'graphql-subscriptions';

export const pubSub = new PubSub();

@Resolver(() => Message)
class MessageResolver {
  constructor(private readonly repoService: RepoService) { }

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => [Message])
  public async getMessageFromUser(@Args('userId') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne({
      where: { userId: id }
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id)
  }

  @Mutation(() => Message)
  public async createMessage(@Args('data') input: MessageInput):
    Promise<Message> {
    const message = this.repoService.messageRepo.create({
      userId: input.userId,
      content: input.content,
    });
   
    const response = await this.repoService.messageRepo.save(message);

    pubSub.publish('messageAdded', { messageAdded: {
      ...message
    }})

    return response;
  }

  @Mutation(() => Message, { nullable: true })
  public async deleteMessage(@Args('data') input: MessageDeleteInput):
    Promise<Message> {
    let message = await this.repoService.messageRepo.findOne(input.idMessage);

    if (!message || message.userId !== input.userId)
      throw new Error("Message does not exists or you are not the message author")

    const copy = { ...message };
    
    await this.repoService.messageRepo.remove(message);

    return copy;
  }

  //Quando alguém criar uma mensagem vai cair aqui
  @Subscription(returns => Message, {
    name: 'messageAdded',
  })
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }


  //getUser é o nome da função
  @ResolveField(() => User)
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}
export default MessageResolver;