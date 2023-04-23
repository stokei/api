import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { SubscriptionContractItemCreatedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-created.event';
import { SubscriptionContractItemRemovedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-removed.event';
import { SubscriptionContractItemUpdatedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-updated.event';

@Injectable()
export class SubscriptionContractItemsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SubscriptionContractItemsSagas.name);
    this.logger.log(`Saga ${SubscriptionContractItemsSagas.name} init`);
  }

  @Saga()
  subscriptionContractItemCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractItemCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractItemCreatedEvent] Saga event subscriptionContractItemCreated: ' +
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
  subscriptionContractItemRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractItemRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractItemRemovedEvent] Saga event subscriptionContractItemRemoved:' +
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
  subscriptionContractItemUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractItemUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractItemUpdatedEvent] Saga event subscriptionContractItemUpdated:' +
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
