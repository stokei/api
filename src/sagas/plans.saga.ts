import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';

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
