import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ClassroomInstructorCreatedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-created.event';
import { ClassroomInstructorRemovedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-removed.event';

@Injectable()
export class ClassroomInstructorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomInstructorsSagas.name);
    this.logger.log(`Saga ${ClassroomInstructorsSagas.name} init`);
  }

  @Saga()
  classroomInstructorCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomInstructorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomInstructorCreatedEvent] Saga event classroomInstructorCreated: ' +
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
  classroomInstructorRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomInstructorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomInstructorRemovedEvent] Saga event classroomInstructorRemoved:' +
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
