import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject, splitServiceId } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { RemoveFileCommand } from '@/commands/implements/files/remove-file.command';
import { UpdateFileCommand } from '@/commands/implements/files/update-file.command';
import { RemoveImageCommand } from '@/commands/implements/images/remove-image.command';
import { CreateSortedItemCommand } from '@/commands/implements/sorted-items/create-sorted-item.command';
import { CreateVideoAuthorCommand } from '@/commands/implements/video-authors/create-video-author.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideoActivatedEvent } from '@/events/implements/videos/video-activated.event';
import { VideoCreatedEvent } from '@/events/implements/videos/video-created.event';
import { VideoRemovedEvent } from '@/events/implements/videos/video-removed.event';
import { VideoUpdatedEvent } from '@/events/implements/videos/video-updated.event';

@Injectable()
export class VideosSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideosSagas.name);
    this.logger.log(`Saga ${VideosSagas.name} init`);
  }

  @Saga()
  videoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoCreatedEvent] Saga event videoCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [
          new CreateVideoAuthorCommand({
            video: event.video.id,
            app: event.video.app,
            author: event.createdBy,
            createdBy: event.createdBy
          })
        ];
        if (!!event.video.file) {
          commands.push(
            new UpdateFileCommand({
              data: {
                duration: event.video.duration,
                updatedBy: event.createdBy
              },
              where: {
                app: event.video.app,
                file: event.video.file
              }
            })
          );
        }
        if (
          splitServiceId(event.video.parent)?.service ===
          ServerStokeiApiIdPrefix.MODULES
        ) {
          commands.push(
            new CreateSortedItemCommand({
              parent: event.video.parent,
              item: event.video.id,
              app: event.video.app,
              createdBy: event.createdBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  videoRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoRemovedEvent] Saga event videoRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        if (event.video.file) {
          commands.push(
            new RemoveFileCommand({
              where: {
                file: event.video.file,
                app: event.video.app,
                removedBy: event.removedBy
              }
            })
          );
        }
        if (event.video.poster) {
          commands.push(
            new RemoveImageCommand({
              where: {
                image: event.video.poster,
                app: event.video.app,
                removedBy: event.removedBy
              }
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  videoUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoUpdatedEvent] Saga event videoUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [];
        if (!!event.video.file) {
          commands.push(
            new UpdateFileCommand({
              data: {
                duration: event.video.duration,
                updatedBy: event.updatedBy
              },
              where: {
                app: event.video.app,
                file: event.video.file
              }
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  videoActivated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoActivatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [VideoActivatedEvent] Saga event videoActivated:' +
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
