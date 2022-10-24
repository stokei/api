import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { UsageRecordCreatedEvent } from '@/events/implements/usage-records/usage-record-created.event';
import { UsageRecordRemovedEvent } from '@/events/implements/usage-records/usage-record-removed.event';
import { UsageRecordUpdatedEvent } from '@/events/implements/usage-records/usage-record-updated.event';

@Injectable()
export class UsageRecordsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(UsageRecordsSagas.name);
    this.logger.log(`Saga ${UsageRecordsSagas.name} init`);
  }

  @Saga()
  usageRecordCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UsageRecordCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [UsageRecordCreatedEvent] Saga event usageRecordCreated: ' +
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
  usageRecordRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UsageRecordRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [UsageRecordRemovedEvent] Saga event usageRecordRemoved:' +
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
  usageRecordUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UsageRecordUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [UsageRecordUpdatedEvent] Saga event usageRecordUpdated:' +
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
