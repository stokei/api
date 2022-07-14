import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ModuleVideoCreatedEvent } from '@/events/implements/module-videos/module-video-created.event';
import { ModuleVideoRemovedEvent } from '@/events/implements/module-videos/module-video-removed.event';

@Injectable()
export class ModuleVideosSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ModuleVideosSagas.name);
    this.logger.log(`Saga ${ModuleVideosSagas.name} init`);
  }

  @Saga()
  moduleVideoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModuleVideoCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModuleVideoCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModuleVideoCreatedEvent] Saga event moduleVideoCreated: ' +
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
  moduleVideoRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModuleVideoRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ModuleVideoRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ModuleVideoRemovedEvent] Saga event moduleVideoRemoved:' +
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
