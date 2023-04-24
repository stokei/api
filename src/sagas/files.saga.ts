import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { AddFileToAppSubscriptionContractCommand } from '@/commands/implements/files/add-file-to-app-subscription-contract.command';
import { AddVideoFileToAppSubscriptionContractCommand } from '@/commands/implements/files/add-video-file-to-app-subscription-contract.command';
import { RemoveFileFromAppSubscriptionContractCommand } from '@/commands/implements/files/remove-file-from-app-subscription-contract.command';
import { RemoveVideoFromAppSubscriptionContractCommand } from '@/commands/implements/files/remove-video-from-app-subscription-contract.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { FileActivatedEvent } from '@/events/implements/files/file-activated.event';
import { FileCreatedEvent } from '@/events/implements/files/file-created.event';
import { FileRemovedEvent } from '@/events/implements/files/file-removed.event';
import { FileUpdatedEvent } from '@/events/implements/files/file-updated.event';
import { VideoUploadURLCreatedEvent } from '@/events/implements/files/video-upload-url-created.event';

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
        const commands = [];
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
        if (!event.file.isVideo && !event.file.isImage) {
          commands.push(
            new RemoveFileFromAppSubscriptionContractCommand({
              file: event.file.id,
              removedBy: event.removedBy
            })
          );
        } else if (event.file.isVideo) {
          commands.push(
            new RemoveVideoFromAppSubscriptionContractCommand({
              file: event.file.id,
              removedBy: event.removedBy
            })
          );
        }
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
  fileActivated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FileActivatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FileActivatedEvent] Saga event fileActivated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (!event.file.isVideo && !event.file.isImage) {
          commands.push(
            new AddFileToAppSubscriptionContractCommand({
              file: event.file.id,
              createdBy: event.updatedBy
            })
          );
        } else if (event.file.isVideo) {
          commands.push(
            new AddVideoFileToAppSubscriptionContractCommand({
              file: event.file.id,
              createdBy: event.updatedBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  videoUploadURLCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoUploadURLCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoUploadURLCreatedEvent] Saga event videoUploadURLCreated: ' +
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
