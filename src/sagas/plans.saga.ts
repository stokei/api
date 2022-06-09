import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';
import { PlanRemovedEvent } from '@/events/implements/plans/plan-removed.event';
import { PlanUpdatedEvent } from '@/events/implements/plans/plan-updated.event';

@Injectable()
export class PlansSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PlansSagas.name);
    this.logger.log(`Saga ${PlansSagas.name} init`);
  }

  @Saga()
  planCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PlanCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PlanCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PlanCreatedEvent] Saga event planCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  planRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PlanRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PlanRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PlanRemovedEvent] Saga event planRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  planUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PlanUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PlanUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PlanUpdatedEvent] Saga event planUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
