import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DomainCreatedEvent } from '@/events/implements/domains/domain-created.event';
import { DomainRemovedEvent } from '@/events/implements/domains/domain-removed.event';
import { DomainUpdatedEvent } from '@/events/implements/domains/domain-updated.event';

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
          'Inside [DomainCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [DomainCreatedEvent] Saga event domainCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  domainRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DomainRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [DomainRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [DomainRemovedEvent] Saga event domainRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  domainUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DomainUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [DomainUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [DomainUpdatedEvent] Saga event domainUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
