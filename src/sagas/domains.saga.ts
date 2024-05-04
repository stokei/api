import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { UpdateAppCommand } from '@/commands/implements/apps/update-app.command';
import { ActivateDomainCommand } from '@/commands/implements/domains/activate-domain.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { IS_PRODUCTION } from '@/environments';
import { DomainActivatedEvent } from '@/events/implements/domains/domain-activated.event';
import { DomainCreatedEvent } from '@/events/implements/domains/domain-created.event';
import { DomainRemovedEvent } from '@/events/implements/domains/domain-removed.event';

@Injectable()
export class DomainsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(DomainsSagas.name);
    this.logger.log(`Saga ${DomainsSagas.name} init`);
  }

  @Saga()
  domainCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DomainCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [DomainCreatedEvent] Saga event domainCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [];
        if (!IS_PRODUCTION) {
          commands.push(
            new ActivateDomainCommand({
              domain: event.domain.id,
              app: event.domain.app,
              updatedBy: event.createdBy
            })
          );
        }
        if (event.isDefault) {
          commands.push(
            new UpdateAppCommand({
              data: {
                defaultDomain: event.domain.id,
                updatedBy: event.createdBy
              },
              where: {
                app: event.domain.app
              }
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  domainRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DomainRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [DomainRemovedEvent] Saga event domainRemoved:' +
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
  domainActivated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DomainActivatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [DomainActivatedEvent] Saga event domainActivated:' +
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
