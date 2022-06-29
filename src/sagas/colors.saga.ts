import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ColorCreatedEvent } from '@/events/implements/colors/color-created.event';
import { ColorRemovedEvent } from '@/events/implements/colors/color-removed.event';
import { ColorUpdatedEvent } from '@/events/implements/colors/color-updated.event';

@Injectable()
export class ColorsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ColorsSagas.name);
    this.logger.log(`Saga ${ColorsSagas.name} init`);
  }

  @Saga()
  colorCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ColorCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ColorCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ColorCreatedEvent] Saga event colorCreated: ' +
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
  colorRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ColorRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ColorRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ColorRemovedEvent] Saga event colorRemoved:' +
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
  colorUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ColorUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ColorUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ColorUpdatedEvent] Saga event colorUpdated:' +
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
