import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { RemoveFileCommand } from '@/commands/implements/files/remove-file.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { MaterialCreatedEvent } from '@/events/implements/materials/material-created.event';
import { MaterialRemovedEvent } from '@/events/implements/materials/material-removed.event';
import { MaterialUpdatedEvent } from '@/events/implements/materials/material-updated.event';

@Injectable()
export class MaterialsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(MaterialsSagas.name);
    this.logger.log(`Saga ${MaterialsSagas.name} init`);
  }

  @Saga()
  materialCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MaterialCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [MaterialCreatedEvent] Saga event materialCreated: ' +
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
  materialRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MaterialRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [MaterialRemovedEvent] Saga event materialRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new RemoveFileCommand({
            where: {
              file: event.material.file,
              app: event.material.app,
              removedBy: event.removedBy
            }
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  materialUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MaterialUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [MaterialUpdatedEvent] Saga event materialUpdated:' +
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
