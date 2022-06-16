import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';
import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';
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
          'Inside [AccountCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccountCreatedEvent] Saga event accountCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  accountRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccountRemovedEvent] Saga event accountRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  accountUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccountUpdatedEvent] Saga event accountUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  passwordChanged = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PasswordChangedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PasswordChangedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PasswordChangedEvent] Saga event passwordChanged:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  passwordForgotten = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PasswordForgottenEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PasswordForgottenEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PasswordForgottenEvent] Saga event passwordForgotten:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
