import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AppInstructorCreatedEvent } from '@/events/implements/app-instructors/app-instructor-created.event';
import { AppInstructorRemovedEvent } from '@/events/implements/app-instructors/app-instructor-removed.event';

@Injectable()
export class AppInstructorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AppInstructorsSagas.name);
    this.logger.log(`Saga ${AppInstructorsSagas.name} init`);
  }

  @Saga()
  appInstructorCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AppInstructorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AppInstructorCreatedEvent] Saga event appInstructorCreated: ' +
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
  appInstructorRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AppInstructorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AppInstructorRemovedEvent] Saga event appInstructorRemoved:' +
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
