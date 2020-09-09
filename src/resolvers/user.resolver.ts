import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import User from 'src/db/models/user.entity';
import RepoService from 'src/repo.service';
import UserInput from './input/user.input';

@Resolver(() => User)
class UserResolver {
   constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, {nullable: true})
  public async getUserId(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput): 
    Promise<User> {
      const author = this.repoService.userRepo.create({ email: input.email });
      return this.repoService.userRepo.save(author);
  }
}
export default UserResolver;