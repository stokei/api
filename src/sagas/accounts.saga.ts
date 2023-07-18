import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateAccountStripeCustomerCommand } from '@/commands/implements/accounts/create-account-stripe-customer.command';
import { UpdateAccountStripeCustomerCommand } from '@/commands/implements/accounts/update-account-stripe-customer.command';
import { SendAccountConfigurationPendingEmailCommand } from '@/commands/implements/emails/send-account-configuration-pending-email.command';
import { SendForgotPasswordEmailCommand } from '@/commands/implements/emails/send-forgot-password-email.command';
import { SendUpdateOwnPasswordEmailCommand } from '@/commands/implements/emails/send-update-own-password-email.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AccountStatus } from '@/enums/account-status.enum';
import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';
import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';
import { AccountUpdatedEvent } from '@/events/implements/accounts/account-updated.event';
import { PasswordChangedEvent } from '@/events/implements/accounts/password-changed.event';
import { PasswordForgottenEvent } from '@/events/implements/accounts/password-forgotten.event';
import { UpdateOwnPasswordCreatedEvent } from '@/events/implements/accounts/update-own-password-created.event';

@Injectable()
export class AccountsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AccountsSagas.name);
    this.logger.log(`Saga ${AccountsSagas.name} init`);
  }

  @Saga()
  accountCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountCreatedEvent] Saga event accountCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [
          new CreateAccountStripeCustomerCommand({
            account: event.account.id,
            app: event.account.app,
            createdBy: event.createdBy
          })
        ];
        if (event.account.status === AccountStatus.CONFIGURATION_PENDING) {
          commands.push(
            new SendAccountConfigurationPendingEmailCommand({
              toAccount: event.account.id,
              app: event.account.app,
              createdBy: event.createdBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  accountRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountRemovedEvent] Saga event accountRemoved:' +
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
  accountUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountUpdatedEvent] Saga event accountUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        if (event.account.stripeCustomer) {
          commands.push(
            new UpdateAccountStripeCustomerCommand({
              account: event.account.id,
              app: event.account.app
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  passwordChanged = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PasswordChangedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PasswordChangedEvent] Saga event passwordChanged:' +
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
  passwordForgotten = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PasswordForgottenEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PasswordForgottenEvent] Saga event passwordForgotten:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new SendForgotPasswordEmailCommand({
            app: event.account.app,
            toAccount: event.account.id,
            createdBy: event.account.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  updateOwnPasswordCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(UpdateOwnPasswordCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [UpdateOwnPasswordCreatedEvent] Saga event updateOwnPasswordCreated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new SendUpdateOwnPasswordEmailCommand({
            app: event.account.app,
            toAccount: event.account.id,
            createdBy: event.account.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
