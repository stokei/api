import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { CoursesAdminCreatedEvent } from '@/events/implements/courses-admins/courses-admin-created.event';
import { CoursesAdminRemovedEvent } from '@/events/implements/courses-admins/courses-admin-removed.event';
import { CoursesAdminUpdatedEvent } from '@/events/implements/courses-admins/courses-admin-updated.event';

@Injectable()
export class CoursesAdminsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(CoursesAdminsSagas.name);
    this.logger.log(`Saga ${CoursesAdminsSagas.name} init`);
  }

  @Saga()
  coursesAdminCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesAdminCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesAdminCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesAdminCreatedEvent] Saga event coursesAdminCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  coursesAdminRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesAdminRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesAdminRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesAdminRemovedEvent] Saga event coursesAdminRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  coursesAdminUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoursesAdminUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [CoursesAdminUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [CoursesAdminUpdatedEvent] Saga event coursesAdminUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
