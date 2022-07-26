import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ImageCreatedEvent } from '@/events/implements/images/image-created.event';
import { ImageRemovedEvent } from '@/events/implements/images/image-removed.event';

@Injectable()
export class ImagesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ImagesSagas.name);
    this.logger.log(`Saga ${ImagesSagas.name} init`);
  }

  @Saga()
  imageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ImageCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ImageCreatedEvent] Saga event imageCreated: ' +
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
  imageRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ImageRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ImageRemovedEvent] Saga event imageRemoved:' +
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
