import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@stokei/nestjs';

import { CommandHandlers } from './commands/handlers';
import { Controllers } from './controllers';
import { Loaders } from './controllers/graphql/dataloaders';
import { Resolvers } from './controllers/graphql/resolvers';
import { DatabaseModule } from './database/database.module';
import { Entities } from './entities';
import { IS_PRODUCTION, TOKEN_SECRET_KEY } from './environments';
import { EventsHandlers } from './events/handlers';
import { QueriesHandlers } from './queries/handlers';
import { Repositories } from './repositories';
import { Sagas } from './sagas';
import { Services } from './services';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    AuthModule.forRoot({ secretKey: TOKEN_SECRET_KEY }),
    ...Entities,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: !IS_PRODUCTION,
      debug: !IS_PRODUCTION,
      introspection: !IS_PRODUCTION,
      autoSchemaFile: true
    })
  ],
  controllers: [...Controllers],
  providers: [
    ...Resolvers,
    ...Repositories,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...CommandHandlers,
    ...Sagas,
    ...Services,
    ...Loaders
  ],
  exports: [...Services]
})
export class MainModule {}
