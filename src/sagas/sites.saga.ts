import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CreateLoginPageCommand } from '@/commands/implements/pages/create-login-page.command';
import { CreateSignUpPageCommand } from '@/commands/implements/pages/create-signup-page.command';
import { RemoveSiteDependenciesCommand } from '@/commands/implements/sites/remove-site-dependencies.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { SiteCreatedEvent } from '@/events/implements/sites/site-created.event';
import { SiteRemovedEvent } from '@/events/implements/sites/site-removed.event';
import { SiteUpdatedEvent } from '@/events/implements/sites/site-updated.event';

@Injectable()
export class SitesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SitesSagas.name);
    this.logger.log(`Saga ${SitesSagas.name} init`);
  }

  @Saga()
  siteCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SiteCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SiteCreatedEvent] Saga event siteCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [
          new CreateLoginPageCommand({
            parent: event.site.id,
            app: event.site.app,
            createdBy: event.createdBy
          }),
          new CreateSignUpPageCommand({
            parent: event.site.id,
            app: event.site.app,
            createdBy: event.createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  siteRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SiteRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SiteRemovedEvent] Saga event siteRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [
          new RemoveSiteDependenciesCommand({
            site: event.site,
            app: event.site.app,
            removedBy: event.removedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  siteUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SiteUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [SiteUpdatedEvent] Saga event siteUpdated:' +
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
