import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { RemovePageDependenciesCommand } from '@/commands/implements/pages/remove-page-dependencies.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { PageCreatedEvent } from '@/events/implements/pages/page-created.event';
import { PageRemovedEvent } from '@/events/implements/pages/page-removed.event';
import { PageUpdatedEvent } from '@/events/implements/pages/page-updated.event';

@Injectable()
export class PagesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PagesSagas.name);
    this.logger.log(`Saga ${PagesSagas.name} init`);
  }

  @Saga()
  pageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PageCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PageCreatedEvent] Saga event pageCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  pageRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PageRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PageRemovedEvent] Saga event pageRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [
          new RemovePageDependenciesCommand({
            page: event.page,
            app: event.page.app,
            removedBy: event.removedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  pageUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PageUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PageUpdatedEvent] Saga event pageUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
