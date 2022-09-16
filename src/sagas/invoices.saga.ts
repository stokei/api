import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { InvoiceCreatedEvent } from '@/events/implements/invoices/invoice-created.event';

@Injectable()
export class InvoicesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(InvoicesSagas.name);
    this.logger.log(`Saga ${InvoicesSagas.name} init`);
  }

  @Saga()
  invoiceCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InvoiceCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [InvoiceCreatedEvent] Saga event invoiceCreated: ' +
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
