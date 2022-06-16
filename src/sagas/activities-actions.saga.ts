import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ActivitiesActionCreatedEvent } from '@/events/implements/activities-actions/activities-action-created.event';
import { ActivitiesActionRemovedEvent } from '@/events/implements/activities-actions/activities-action-removed.event';
import { ActivitiesActionUpdatedEvent } from '@/events/implements/activities-actions/activities-action-updated.event';

@Injectable()
export class ActivitiesActionsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ActivitiesActionsSagas.name);
    this.logger.log(`Saga ${ActivitiesActionsSagas.name} init`);
  }

  @Saga()
  activitiesActionCreated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ActivitiesActionCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ActivitiesActionCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ActivitiesActionCreatedEvent] Saga event activitiesActionCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  activitiesActionRemoved = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ActivitiesActionRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ActivitiesActionRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ActivitiesActionRemovedEvent] Saga event activitiesActionRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  activitiesActionUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ActivitiesActionUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ActivitiesActionUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ActivitiesActionUpdatedEvent] Saga event activitiesActionUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
