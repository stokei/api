import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { ActivityCreatedEvent } from '@/events/implements/activities/activity-created.event';
import { ActivityRemovedEvent } from '@/events/implements/activities/activity-removed.event';
import { ActivityUpdatedEvent } from '@/events/implements/activities/activity-updated.event';

@Injectable()
export class ActivitiesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ActivitiesSagas.name);
    this.logger.log(`Saga ${ActivitiesSagas.name} init`);
  }

  @Saga()
  activityCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ActivityCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ActivityCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ActivityCreatedEvent] Saga event activityCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  activityRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ActivityRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ActivityRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ActivityRemovedEvent] Saga event activityRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  activityUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ActivityUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [ActivityUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [ActivityUpdatedEvent] Saga event activityUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
