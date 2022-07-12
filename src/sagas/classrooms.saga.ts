import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ClassroomCreatedEvent } from '@/events/implements/classrooms/classroom-created.event';
import { ClassroomRemovedEvent } from '@/events/implements/classrooms/classroom-removed.event';
import { ClassroomUpdatedEvent } from '@/events/implements/classrooms/classroom-updated.event';

@Injectable()
export class ClassroomsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsSagas.name);
    this.logger.log(`Saga ${ClassroomsSagas.name} init`);
  }

  @Saga()
  classroomCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomCreatedEvent] Saga event classroomCreated: ' +
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
  classroomRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomRemovedEvent] Saga event classroomRemoved:' +
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
  classroomUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomUpdatedEvent] Saga event classroomUpdated:' +
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
