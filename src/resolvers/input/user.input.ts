import { Field, InputType } from '@nestjs/graphql';

//Dado que vai inserir para criar o usuário

@InputType()
class UserInput {
  @Field()
  readonly email: string;
}

export default UserInput;