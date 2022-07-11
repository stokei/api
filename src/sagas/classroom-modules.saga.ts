import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ClassroomModuleCreatedEvent } from '@/events/implements/classroom-module s/classroom-module -created.event';
import { ClassroomModuleRemovedEvent } from '@/events/implements/classroom-module s/classroom-module -removed.event';
import { ClassroomModuleUpdatedEvent } from '@/events/implements/classroom-module s/classroom-module -updated.event';

@Injectable()
export class ClassroomModulesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomModulesSagas.name);
    this.logger.log(`Saga ${ClassroomModulesSagas.name} init`);
  }

  @Saga()
  classroomModuleCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomModuleCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomModuleCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomModuleCreatedEvent] Saga event classroomModuleCreated: ' +
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
  classroomModuleRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomModuleRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomModuleRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomModuleRemovedEvent] Saga event classroomModuleRemoved:' +
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
  classroomModuleUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomModuleUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomModuleUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomModuleUpdatedEvent] Saga event classroomModuleUpdated:' +
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
