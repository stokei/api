import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ClassroomsTagCreatedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-created.event';
import { ClassroomsTagRemovedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-removed.event';
import { ClassroomsTagUpdatedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-updated.event';

@Injectable()
export class ClassroomsTagsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsTagsSagas.name);
    this.logger.log(`Saga ${ClassroomsTagsSagas.name} init`);
  }

  @Saga()
  classroomsTagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsTagCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsTagCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsTagCreatedEvent] Saga event classroomsTagCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsTagRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsTagRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsTagRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsTagRemovedEvent] Saga event classroomsTagRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsTagUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsTagUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsTagUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsTagUpdatedEvent] Saga event classroomsTagUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
