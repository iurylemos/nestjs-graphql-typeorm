import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import * as ormOptions from './config/orm';
import RepoModule from './repo.module';
import UserResolver from './resolvers/user.resolver';
import MessageResolver from './resolvers/message.resolver';


const graphQLImports = [
  UserResolver, MessageResolver
];

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), RepoModule, ...graphQLImports, GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    playground: true,
    installSubscriptionHandlers: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
