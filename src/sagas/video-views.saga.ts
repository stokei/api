import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { AddVideoViewToAppSubscriptionContractCommand } from '@/commands/implements/video-views/add-video-view-to-app-subscription-contract.command';
import { IncrementVideoViewCommand } from '@/commands/implements/video-views/increment-video-view.command';
import { VideoViewIncrementedEvent } from '@/events/implements/video-views/video-view-incremented.event';
import { VideoViewIncrementedSuccessfullyEvent } from '@/events/implements/video-views/video-view-incremented-successfully.event';

@Injectable()
export class VideoViewsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(VideoViewsSagas.name);
    this.logger.log(`Saga ${VideoViewsSagas.name} init`);
  }

  @Saga()
  videoViewIncremented = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoViewIncrementedEvent),
      delay(500),
      map((event) => {
        const commands = [new IncrementVideoViewCommand(event)];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  videoViewIncrementedSuccessfully = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(VideoViewIncrementedSuccessfullyEvent),
      delay(500),
      map((event) => {
        const commands = [
          new AddVideoViewToAppSubscriptionContractCommand({
            videoView: event.videoView,
            createdBy: event.createdBy,
            viewedDuration: event.viewedDuration
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
