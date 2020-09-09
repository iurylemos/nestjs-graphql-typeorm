import { Field, InputType } from '@nestjs/graphql';
import UserInput from './user.input';
//Dado que vai inserir para criar o usuário

// @InputType()
// class MessageUserConnectInput {
//   @Field()
//   readonly id: number;
// }

// @InputType()
// class MessageUserInput {
//   @Field({ nullable: false })
//   readonly connect: MessageUserConnectInput;

//   @Field({ nullable: false })
//   readonly create: UserInput;
// }

// @InputType()
// class MessageInput {
//   @Field()
//   readonly content: string;

//   @Field()
//   readonly user: MessageUserInput;
// }


@InputType()
export default class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly userId: number;
}

@InputType()
export class MessageDeleteInput {
  @Field()
  readonly idMessage: number;

  @Field()
  readonly userId: number;
}