import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from '@stokei/nestjs';

import { CommandHandlers } from './commands/handlers';
import { REST_CONTROLLERS_URL_NAMES } from './constants/rest-controllers';
import { Controllers } from './controllers';
import { Loaders } from './controllers/graphql/dataloaders';
import { Resolvers } from './controllers/graphql/resolvers';
import { DatabaseModule } from './database/database.module';
import { Entities } from './entities';
import { IS_PRODUCTION, TOKEN_SECRET_KEY } from './environments';
import { EventsHandlers } from './events/handlers';
import { AppExceptionFilter } from './interceptors';
import { JsonBodyMiddleware } from './middlewares/json-body';
import { RawBodyMiddleware } from './middlewares/raw-body';
import { QueriesHandlers } from './queries/handlers';
import { Repositories } from './repositories';
import { Sagas } from './sagas';
import { Services } from './services';

@Module({
  imports: [
    TerminusModule,
    CacheModule.register(),
    CqrsModule,
    DatabaseModule,
    AuthModule.forRoot({ secretKey: TOKEN_SECRET_KEY }),
    ...Entities,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards', 'interceptors'],
      playground: !IS_PRODUCTION,
      debug: !IS_PRODUCTION,
      introspection: true,
      autoSchemaFile: true
    })
  ],
  controllers: [...Controllers],
  providers: [
    { provide: APP_FILTER, useClass: AppExceptionFilter },
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
export class MainModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/v1/' + REST_CONTROLLERS_URL_NAMES.WEBHOOKS_STRIPE,
        method: RequestMethod.POST
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
