import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { FeatureCreatedEvent } from '@/events/implements/features/feature-created.event';
import { FeatureRemovedEvent } from '@/events/implements/features/feature-removed.event';
import { FeatureUpdatedEvent } from '@/events/implements/features/feature-updated.event';

@Injectable()
export class FeaturesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(FeaturesSagas.name);
    this.logger.log(`Saga ${FeaturesSagas.name} init`);
  }

  @Saga()
  featureCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FeatureCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FeatureCreatedEvent] Saga event featureCreated: ' +
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
  featureRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FeatureRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FeatureRemovedEvent] Saga event featureRemoved:' +
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
  featureUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FeatureUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [FeatureUpdatedEvent] Saga event featureUpdated:' +
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
