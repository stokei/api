import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ClassroomsAdminCreatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-created.event';
import { ClassroomsAdminRemovedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-removed.event';
import { ClassroomsAdminUpdatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-updated.event';

@Injectable()
export class ClassroomsAdminsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsAdminsSagas.name);
    this.logger.log(`Saga ${ClassroomsAdminsSagas.name} init`);
  }

  @Saga()
  classroomsAdminCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsAdminCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsAdminCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsAdminCreatedEvent] Saga event classroomsAdminCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsAdminRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsAdminRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsAdminRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsAdminRemovedEvent] Saga event classroomsAdminRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsAdminUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsAdminUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsAdminUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsAdminUpdatedEvent] Saga event classroomsAdminUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
