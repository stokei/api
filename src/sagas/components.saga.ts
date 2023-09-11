import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ComponentCreatedEvent } from '@/events/implements/components/component-created.event';
import { ComponentRemovedEvent } from '@/events/implements/components/component-removed.event';
import { ComponentUpdatedEvent } from '@/events/implements/components/component-updated.event';

@Injectable()
export class ComponentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ComponentsSagas.name);
    this.logger.log(`Saga ${ComponentsSagas.name} init`);
  }

  @Saga()
  componentCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ComponentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ComponentCreatedEvent] Saga event componentCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  componentRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ComponentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ComponentRemovedEvent] Saga event componentRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  componentUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ComponentUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ComponentUpdatedEvent] Saga event componentUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
