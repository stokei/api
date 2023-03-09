import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { HeroCreatedEvent } from '@/events/implements/heros/hero-created.event';
import { HeroRemovedEvent } from '@/events/implements/heros/hero-removed.event';
import { HeroUpdatedEvent } from '@/events/implements/heros/hero-updated.event';

@Injectable()
export class HerosSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(HerosSagas.name);
    this.logger.log(`Saga ${HerosSagas.name} init`);
  }

  @Saga()
  heroCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(HeroCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [HeroCreatedEvent] Saga event heroCreated: ' +
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
  heroRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(HeroRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [HeroRemovedEvent] Saga event heroRemoved:' +
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
  heroUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(HeroUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [HeroUpdatedEvent] Saga event heroUpdated:' +
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
