import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { AddDomainToAppSubscriptionContractCommand } from '@/commands/implements/domains/add-domain-to-app-subscription-contract.command';
import { RemoveDomainFromAppSubscriptionContractCommand } from '@/commands/implements/domains/remove-domain-from-app-subscription-contract.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
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
        const commands = [
          new AddDomainToAppSubscriptionContractCommand({
            createdBy: event.createdBy,
            domain: event.domain.id
          })
        ];
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
        const commands = [
          new RemoveDomainFromAppSubscriptionContractCommand({
            removedBy: event.removedBy,
            domain: event.domain.id
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
