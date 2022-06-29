import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { SubscriptionCreatedEvent } from '@/events/implements/subscriptions/subscription-created.event';
import { SubscriptionRemovedEvent } from '@/events/implements/subscriptions/subscription-removed.event';
import { SubscriptionUpdatedEvent } from '@/events/implements/subscriptions/subscription-updated.event';

@Injectable()
export class SubscriptionsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SubscriptionsSagas.name);
    this.logger.log(`Saga ${SubscriptionsSagas.name} init`);
  }

  @Saga()
  subscriptionCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SubscriptionCreatedEvent] Saga event subscriptionCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  subscriptionRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SubscriptionRemovedEvent] Saga event subscriptionRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  subscriptionUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [SubscriptionUpdatedEvent] Saga event subscriptionUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
