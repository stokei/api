import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { ChangeFromOldDefaultAddressToNewDefaultAddressCommand } from '@/commands/implements/addresses/change-from-old-default-address-to-new-default-address.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { AddressCreatedEvent } from '@/events/implements/addresses/address-created.event';
import { AddressRemovedEvent } from '@/events/implements/addresses/address-removed.event';
import { AddressUpdatedEvent } from '@/events/implements/addresses/address-updated.event';

@Injectable()
export class AddressesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AddressesSagas.name);
    this.logger.log(`Saga ${AddressesSagas.name} init`);
  }

  @Saga()
  addressCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddressCreatedEvent),
      delay(500),
      map((event) => {
        const address = event?.address;
        const createdBy = event?.createdBy;
        if (!address) {
          return;
        }
        this.logger.log(
          'Inside [AddressCreatedEvent] Saga event addressCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new ChangeFromOldDefaultAddressToNewDefaultAddressCommand({
            app: address.app,
            newAddress: address.id,
            updatedBy: createdBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  addressRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddressRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AddressRemovedEvent] Saga event addressRemoved:' +
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
  addressUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddressUpdatedEvent),
      delay(500),
      map((event) => {
        const address = event?.address;
        const updatedBy = event?.updatedBy;
        if (!address) {
          return;
        }
        this.logger.log(
          'Inside [AddressUpdatedEvent] Saga event addressUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands = [
          new ChangeFromOldDefaultAddressToNewDefaultAddressCommand({
            app: address.app,
            newAddress: address.id,
            updatedBy
          })
        ];
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
