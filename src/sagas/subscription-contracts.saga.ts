import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import {
  convertToISOTimestamp,
  hiddenPrivateDataFromObject
} from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { SendSubscriptionsCustomersSubscriptionActivatedEmailCommand } from '@/commands/implements/emails/subscriptions/customers/send-subscription-activated-email.command';
import { SendSubscriptionsCustomersSubscriptionCanceledEmailCommand } from '@/commands/implements/emails/subscriptions/customers/send-subscription-canceled-email.command';
import { SendSubscriptionsCustomersSubscriptionExpiredEmailCommand } from '@/commands/implements/emails/subscriptions/customers/send-subscription-expired-email.command';
import { ActivateSubscriptionContractItemsCommand } from '@/commands/implements/subscription-contract-items/activate-subscription-contract-items.command';
import { CancelSubscriptionContractItemsCommand } from '@/commands/implements/subscription-contract-items/cancel-subscription-contract-items.command';
import { ActivateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/activate-subscription-contract.command';
import { CancelSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/cancel-subscription-contract.command';
import { ExpiresSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/expires-subscription-contract.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';
import { SubscriptionContractActivatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-activated.event';
import { SubscriptionContractCanceledEvent } from '@/events/implements/subscription-contracts/subscription-contract-canceled.event';
import { SubscriptionContractCreatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-created.event';
import { SubscriptionContractCreatedByAdminEvent } from '@/events/implements/subscription-contracts/subscription-contract-created-by-admin.event';
import { SubscriptionContractExpiredEvent } from '@/events/implements/subscription-contracts/subscription-contract-expired.event';
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
        const commands = [];
        let actionStatus: SubscriptionContractStatus =
          SubscriptionContractStatus.PENDING;

        if (
          event.subscriptionContract.type === SubscriptionContractType.RECURRING
        ) {
          if (!event.subscriptionContract.endAt) {
            actionStatus = SubscriptionContractStatus.ACTIVE;
          } else {
            const now = convertToISOTimestamp(Date.now());
            const endAt = convertToISOTimestamp(
              event.subscriptionContract.endAt
            );
            const isExpired = now > endAt;
            if (isExpired) {
              actionStatus = SubscriptionContractStatus.CANCELED;
            } else {
              actionStatus = SubscriptionContractStatus.ACTIVE;
            }
          }
        } else {
          actionStatus = SubscriptionContractStatus.ACTIVE;
        }

        const actionCommands: Record<SubscriptionContractStatus, ICommand> = {
          [SubscriptionContractStatus.PENDING]: undefined,
          [SubscriptionContractStatus.EXPIRED]:
            new ExpiresSubscriptionContractCommand({
              subscriptionContract: event.subscriptionContract.id,
              app: event.subscriptionContract.app,
              updatedBy: event.createdBy
            }),
          [SubscriptionContractStatus.CANCELED]:
            new CancelSubscriptionContractCommand({
              subscriptionContract: event.subscriptionContract.id,
              app: event.subscriptionContract.app,
              updatedBy: event.createdBy
            }),
          [SubscriptionContractStatus.ACTIVE]:
            new ActivateSubscriptionContractCommand({
              paymentMethod: event.subscriptionContract.paymentMethod,
              endAt: event.subscriptionContract.endAt,
              startAt: event.subscriptionContract.startAt,
              app: event.subscriptionContract.app,
              subscriptionContract: event.subscriptionContract.id,
              updatedBy: event.createdBy
            })
        };
        const actionCommand = actionCommands[actionStatus];
        if (actionCommand) {
          commands.push(actionCommand);
        }
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
          }),
          new SendSubscriptionsCustomersSubscriptionActivatedEmailCommand({
            subscriptionContract: event.subscriptionContract,
            app: event.subscriptionContract.app,
            toAccount: event.subscriptionContract.parent,
            createdBy: event.updatedBy
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
          }),
          new SendSubscriptionsCustomersSubscriptionCanceledEmailCommand({
            subscriptionContract: event.subscriptionContract,
            app: event.subscriptionContract.app,
            toAccount: event.subscriptionContract.parent,
            createdBy: event.updatedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  subscriptionContractExpired = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionContractExpiredEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SubscriptionContractExpiredEvent] Saga event subscriptionContractExpired:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new CancelSubscriptionContractItemsCommand({
            subscriptionContract: event.subscriptionContract.id,
            updatedBy: event.updatedBy
          }),
          new SendSubscriptionsCustomersSubscriptionExpiredEmailCommand({
            subscriptionContract: event.subscriptionContract,
            app: event.subscriptionContract.app,
            toAccount: event.subscriptionContract.parent,
            createdBy: event.updatedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
