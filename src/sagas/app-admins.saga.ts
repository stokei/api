import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AppAdminCreatedEvent } from '@/events/implements/app-admins/app-admin-created.event';
import { AppAdminRemovedEvent } from '@/events/implements/app-admins/app-admin-removed.event';

@Injectable()
export class AppAdminsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AppAdminsSagas.name);
    this.logger.log(`Saga ${AppAdminsSagas.name} init`);
  }

  @Saga()
  appAdminCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AppAdminCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AppAdminCreatedEvent] Saga event appAdminCreated: ' +
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
  appAdminRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AppAdminRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AppAdminRemovedEvent] Saga event appAdminRemoved:' +
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
