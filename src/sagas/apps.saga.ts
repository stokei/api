import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { AddAccountRoleCommand } from '@/commands/implements/accounts/add-account-role.command';
import { CreateAppStripeCustomerCommand } from '@/commands/implements/apps/create-app-stripe-customer.command';
import { UpdateAppStripeCustomerCommand } from '@/commands/implements/apps/update-app-stripe-customer.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AccountRole } from '@/enums/account-role.enum';
import { AppCreatedEvent } from '@/events/implements/apps/app-created.event';
import { AppUpdatedEvent } from '@/events/implements/apps/app-updated.event';

@Injectable()
export class AppsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AppsSagas.name);
    this.logger.log(`Saga ${AppsSagas.name} init`);
  }

  @Saga()
  appCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AppCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AppCreatedEvent] Saga event appCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new CreateAppStripeCustomerCommand({
            app: event.app.id,
            createdBy: event.createdBy
          }),
          new AddAccountRoleCommand({
            account: event.app.parent,
            role: AccountRole.ADMIN,
            createdBy: event.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  appUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AppUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AppUpdatedEvent] Saga event appUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const updateOrCreateStripeCustomerCommand = event.app.stripeCustomer
          ? new UpdateAppStripeCustomerCommand({
              app: event.app.id
            })
          : new CreateAppStripeCustomerCommand({
              app: event.app.id,
              createdBy: event.updatedBy
            });
        const commands = [updateOrCreateStripeCustomerCommand];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
