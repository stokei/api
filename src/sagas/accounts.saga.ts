import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';
import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';
import { AccountUpdatedEvent } from '@/events/implements/accounts/account-updated.event';

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
            JSON.stringify(event)
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
            JSON.stringify(event)
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
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
