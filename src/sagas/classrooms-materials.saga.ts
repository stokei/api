import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ClassroomsMaterialCreatedEvent } from '@/events/implements/classrooms-materials/classrooms-material-created.event';
import { ClassroomsMaterialRemovedEvent } from '@/events/implements/classrooms-materials/classrooms-material-removed.event';
import { ClassroomsMaterialUpdatedEvent } from '@/events/implements/classrooms-materials/classrooms-material-updated.event';

@Injectable()
export class ClassroomsMaterialsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ClassroomsMaterialsSagas.name);
    this.logger.log(`Saga ${ClassroomsMaterialsSagas.name} init`);
  }

  @Saga()
  classroomsMaterialCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsMaterialCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsMaterialCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsMaterialCreatedEvent] Saga event classroomsMaterialCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsMaterialRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsMaterialRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsMaterialRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsMaterialRemovedEvent] Saga event classroomsMaterialRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  classroomsMaterialUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ClassroomsMaterialUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ClassroomsMaterialUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ClassroomsMaterialUpdatedEvent] Saga event classroomsMaterialUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
