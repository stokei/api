import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ModulesMaterialCreatedEvent } from '@/events/implements/modules-materials/modules-material-created.event';
import { ModulesMaterialRemovedEvent } from '@/events/implements/modules-materials/modules-material-removed.event';
import { ModulesMaterialUpdatedEvent } from '@/events/implements/modules-materials/modules-material-updated.event';

@Injectable()
export class ModulesMaterialsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ModulesMaterialsSagas.name);
    this.logger.log(`Saga ${ModulesMaterialsSagas.name} init`);
  }

  @Saga()
  modulesMaterialCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModulesMaterialCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModulesMaterialCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModulesMaterialCreatedEvent] Saga event modulesMaterialCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  modulesMaterialRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModulesMaterialRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModulesMaterialRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModulesMaterialRemovedEvent] Saga event modulesMaterialRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  modulesMaterialUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModulesMaterialUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModulesMaterialUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModulesMaterialUpdatedEvent] Saga event modulesMaterialUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
