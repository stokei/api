import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { RoleCreatedEvent } from '@/events/implements/roles/role-created.event';
import { RoleRemovedEvent } from '@/events/implements/roles/role-removed.event';

@Injectable()
export class RolesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(RolesSagas.name);
    this.logger.log(`Saga ${RolesSagas.name} init`);
  }

  @Saga()
  roleCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RoleCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RoleCreatedEvent] Saga event roleCreated: ' +
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
  roleRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RoleRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [RoleRemovedEvent] Saga event roleRemoved:' +
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
