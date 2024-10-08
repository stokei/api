import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendPaymentsCustomersPaymentErrorEmailCommand } from '@/commands/implements/emails/payments/customers/send-payment-error-email.command';
import {
  AccountNotFoundException,
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';
import { SendEmailService } from '@/services/emails/send-email';
import { convertAmountToCurrencyString } from '@/utils/convert-amount-to-currency-string';

type SendPaymentsCustomersPaymentErrorEmailCommandKeys =
  keyof SendPaymentsCustomersPaymentErrorEmailCommand;

@CommandHandler(SendPaymentsCustomersPaymentErrorEmailCommand)
export class SendPaymentsCustomersPaymentErrorEmailCommandHandler
  implements ICommandHandler<SendPaymentsCustomersPaymentErrorEmailCommand>
{
  private readonly logger = new Logger(
    SendPaymentsCustomersPaymentErrorEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: SendPaymentsCustomersPaymentErrorEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendPaymentsCustomersPaymentErrorEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendPaymentsCustomersPaymentErrorEmailCommandKeys>(
          'toAccount'
        );
      }
      if (!data.payment) {
        throw new PaymentNotFoundException();
      }

      const toAccount = await this.findAccountByIdService.execute(
        data.toAccount
      );
      if (!toAccount) {
        throw new AccountNotFoundException();
      }

      const currency = await this.findCurrencyByIdService.execute(
        data.payment.currency
      );
      if (!currency) {
        throw new CurrencyNotFoundException();
      }

      return await this.sendEmailService.execute({
        route: '/payments/customers/payment-error',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
          paymentId: data.payment.id,
          subtotalAmount: convertAmountToCurrencyString({
            amount: data.payment.subtotalAmount,
            currency: currency.id,
            minorUnit: currency.minorUnit
          }),
          totalAmount: convertAmountToCurrencyString({
            amount: data.payment.totalAmount,
            currency: currency.id,
            minorUnit: currency.minorUnit
          })
        }
      });
    } catch (error) {
      this.logger.error(
        `From ${data?.app} to ${data?.toAccount}: ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: SendPaymentsCustomersPaymentErrorEmailCommand
  ): SendPaymentsCustomersPaymentErrorEmailCommand {
    return cleanObject({
      payment: command?.payment,
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
