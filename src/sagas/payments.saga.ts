import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject, splitServiceId } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { SendPaymentErrorEmailCommand } from '@/commands/implements/emails/send-payment-error-email.command';
import { SendPaymentSuccessfullyEmailCommand } from '@/commands/implements/emails/send-payment-successfully-email.command';
import { ChangeInvoiceToPaidCommand } from '@/commands/implements/invoices/change-invoice-to-paid.command';
import { ChangeInvoiceToPaymentErrorCommand } from '@/commands/implements/invoices/change-invoice-to-payment-error.command';
import { ChangeOrderToPaidCommand } from '@/commands/implements/orders/change-order-to-paid.command';
import { ChangeOrderToPaymentErrorCommand } from '@/commands/implements/orders/change-order-to-payment-error.command';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentChangedToPaidEvent } from '@/events/implements/payments/payment-changed-to-paid.event';
import { PaymentChangedToPaymentErrorEvent } from '@/events/implements/payments/payment-changed-to-payment-error.event';
import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';
import { PaymentRemovedEvent } from '@/events/implements/payments/payment-removed.event';
import { PaymentUpdatedEvent } from '@/events/implements/payments/payment-updated.event';

@Injectable()
export class PaymentsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(PaymentsSagas.name);
    this.logger.log(`Saga ${PaymentsSagas.name} init`);
  }

  @Saga()
  paymentCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentCreatedEvent] Saga event paymentCreated: ' +
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
  paymentRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentRemovedEvent] Saga event paymentRemoved:' +
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
  paymentUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentUpdatedEvent] Saga event paymentUpdated:' +
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
  paymentChangedToPaymentError = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentChangedToPaymentErrorEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentChangedToPaymentErrorEvent] Saga event paymentChangedToPaymentError: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [
          new SendPaymentErrorEmailCommand({
            payment: event.payment,
            app: event.payment.app,
            toAccount: event.payment.parent,
            createdBy: event.updatedBy
          })
        ];
        const paymentParentType = splitServiceId(event.payment.parent)?.service;
        if (paymentParentType === ServerStokeiApiIdPrefix.ORDERS) {
          commands.push(
            new ChangeOrderToPaymentErrorCommand({
              app: event.payment.app,
              order: event.payment.parent,
              updatedBy: event.updatedBy
            })
          );
        } else if (paymentParentType === ServerStokeiApiIdPrefix.INVOICES) {
          commands.push(
            new ChangeInvoiceToPaymentErrorCommand({
              app: event.payment.app,
              invoice: event.payment.parent,
              paymentMethod: event.payment.paymentMethod,
              updatedBy: event.updatedBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };

  @Saga()
  paymentChangedToPaid = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentChangedToPaidEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PaymentChangedToPaidEvent] Saga event paymentChangedToPaid: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        const commands: ICommand[] = [
          new SendPaymentSuccessfullyEmailCommand({
            payment: event.payment,
            app: event.payment.app,
            toAccount: event.payment.parent,
            createdBy: event.updatedBy
          })
        ];
        const paymentParentType = splitServiceId(event.payment.parent)?.service;
        if (paymentParentType === ServerStokeiApiIdPrefix.ORDERS) {
          commands.push(
            new ChangeOrderToPaidCommand({
              app: event.payment.app,
              order: event.payment.parent,
              paidAmount: event.payment.totalAmount,
              feeAmount: event.payment.feeAmount,
              updatedBy: event.updatedBy
            })
          );
        } else if (paymentParentType === ServerStokeiApiIdPrefix.INVOICES) {
          commands.push(
            new ChangeInvoiceToPaidCommand({
              app: event.payment.app,
              invoice: event.payment.parent,
              paymentMethod: event.payment.paymentMethod,
              updatedBy: event.updatedBy
            })
          );
        }
        return commands;
      }),
      mergeMap((c) => c)
    );
  };
}
