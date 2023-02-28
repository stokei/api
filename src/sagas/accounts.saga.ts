import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateAccountStripeCustomerCommand } from '@/commands/implements/accounts/create-account-stripe-customer.command';
import { UpdateAccountStripeCustomerCommand } from '@/commands/implements/accounts/update-account-stripe-customer.command';
import { AddAppAdminToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-app-admin-to-app-subscription-contract.command';
import { AddAppInstructorToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-app-instructor-to-app-subscription-contract.command';
import { RemoveAppAdminFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-app-admin-from-app-subscription-contract.command';
import { RemoveAppInstructorFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-app-instructor-from-app-subscription-contract.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AccountRole } from '@/enums/account-role.enum';
import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';
import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';
import { AccountRoleCreatedEvent } from '@/events/implements/accounts/account-role-created.event';
import { AccountRoleRemovedEvent } from '@/events/implements/accounts/account-role-removed.event';
import { AccountUpdatedEvent } from '@/events/implements/accounts/account-updated.event';
import { PasswordChangedEvent } from '@/events/implements/accounts/password-changed.event';
import { PasswordForgottenEvent } from '@/events/implements/accounts/password-forgotten.event';

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
        const commands = [
          new CreateAccountStripeCustomerCommand({
            account: event.account.id,
            app: event.account.app,
            createdBy: event.createdBy
          })
        ];
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
        const updateOrCreateStripeCustomerCommand = event.account.stripeCustomer
          ? new UpdateAccountStripeCustomerCommand({
              account: event.account.id,
              app: event.account.app
            })
          : new CreateAccountStripeCustomerCommand({
              account: event.account.id,
              app: event.account.app,
              createdBy: event.updatedBy
            });
        const commands = [updateOrCreateStripeCustomerCommand];
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
        const commands = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  accountRoleCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountRoleCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountRoleCreatedEvent] Saga event accountRoleCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (event.role === AccountRole.ADMIN) {
          commands.push(
            new AddAppAdminToAppSubscriptionContractCommand({
              admin: event.account.id,
              app: event.account.app,
              createdBy: event.createdBy
            })
          );
        }
        if (event.role === AccountRole.INSTRUCTOR) {
          commands.push(
            new AddAppInstructorToAppSubscriptionContractCommand({
              instructor: event.account.id,
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
  accountRoleRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountRoleRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountRoleRemovedEvent] Saga event accountRoleRemoved: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (event.role === AccountRole.ADMIN) {
          commands.push(
            new RemoveAppAdminFromAppSubscriptionContractCommand({
              admin: event.account.id,
              app: event.account.app,
              removedBy: event.removedBy
            })
          );
        }
        if (event.role === AccountRole.INSTRUCTOR) {
          commands.push(
            new RemoveAppInstructorFromAppSubscriptionContractCommand({
              instructor: event.account.id,
              app: event.account.app,
              removedBy: event.removedBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
