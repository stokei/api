import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { RecurringCreatedEvent } from '@/events/implements/recurrings/recurring-created.event';
import { RecurringRemovedEvent } from '@/events/implements/recurrings/recurring-removed.event';

@Injectable()
export class RecurringsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(RecurringsSagas.name);
    this.logger.log(`Saga ${RecurringsSagas.name} init`);
  }

  @Saga()
  recurringCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RecurringCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RecurringCreatedEvent] Saga event recurringCreated: ' +
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
  recurringRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RecurringRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RecurringRemovedEvent] Saga event recurringRemoved:' +
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
