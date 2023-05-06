import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { ActivateSubscriptionContractItemsCommand } from '@/commands/implements/subscription-contract-items/activate-subscription-contract-items.command';
import { CancelSubscriptionContractItemsCommand } from '@/commands/implements/subscription-contract-items/cancel-subscription-contract-items.command';
import { ActivateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/activate-subscription-contract.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { SubscriptionContractActivatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-activated.event';
import { SubscriptionContractCanceledEvent } from '@/events/implements/subscription-contracts/subscription-contract-canceled.event';
import { SubscriptionContractCreatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-created.event';
import { SubscriptionContractCreatedByAdminEvent } from '@/events/implements/subscription-contracts/subscription-contract-created-by-admin.event';
import { SubscriptionContractUpdatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-updated.event';

@Injectable()
export class SubscriptionContractsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SubscriptionContractsSagas.name);
    this.logger.log(`Saga ${SubscriptionContractsSagas.name} init`);
  }

  @Saga()
  subscriptionContractCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractCreatedEvent] Saga event subscriptionContractCreated: ' +
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
  subscriptionContractCreatedByAdmin = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractCreatedByAdminEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractCreatedByAdminEvent] Saga event subscriptionContractCreatedByAdmin: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new ActivateSubscriptionContractCommand({
            paymentMethod: event.subscriptionContract.paymentMethod,
            endAt: event.subscriptionContract.endAt,
            startAt: event.subscriptionContract.startAt,
            app: event.subscriptionContract.app,
            subscriptionContract: event.subscriptionContract.id,
            updatedBy: event.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  subscriptionContractUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractUpdatedEvent] Saga event subscriptionContractUpdated:' +
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
  subscriptionContractActivated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractActivatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractActivatedEvent] Saga event subscriptionContractActivated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new ActivateSubscriptionContractItemsCommand({
            subscriptionContract: event.subscriptionContract.id,
            updatedBy: event.updatedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  subscriptionContractCanceled = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractCanceledEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractCanceledEvent] Saga event subscriptionContractCanceled:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new CancelSubscriptionContractItemsCommand({
            subscriptionContract: event.subscriptionContract.id,
            updatedBy: event.updatedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
