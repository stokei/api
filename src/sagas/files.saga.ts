import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { StartFileEncodingCommand } from '@/commands/implements/files/start-file-encoding.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { FileCreatedEvent } from '@/events/implements/files/file-created.event';
import { FileEncodingStartedEvent } from '@/events/implements/files/file-encoding-started.event';
import { FileRemovedEvent } from '@/events/implements/files/file-removed.event';
import { FileUpdatedEvent } from '@/events/implements/files/file-updated.event';

@Injectable()
export class FilesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(FilesSagas.name);
    this.logger.log(`Saga ${FilesSagas.name} init`);
  }

  @Saga()
  fileCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileCreatedEvent] Saga event fileCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          event.file.canStartEncoding &&
            new StartFileEncodingCommand({
              app: event.file.app,
              file: event.file.id,
              updatedBy: event.createdBy
            })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  fileRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileRemovedEvent] Saga event fileRemoved:' +
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
  fileUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileUpdatedEvent] Saga event fileUpdated:' +
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
  fileEncodingStarted = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileEncodingStartedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileEncodingStartedEvent] Saga event fileEncodingStart:' +
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
