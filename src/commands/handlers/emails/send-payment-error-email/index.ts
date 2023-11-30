import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendPaymentErrorEmailCommand } from '@/commands/implements/emails/send-payment-error-email.command';
import {
  AppNotFoundException,
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';
import { SendEmailService } from '@/services/emails/send-email';

type SendPaymentErrorEmailCommandKeys = keyof SendPaymentErrorEmailCommand;

@CommandHandler(SendPaymentErrorEmailCommand)
export class SendPaymentErrorEmailCommandHandler
  implements ICommandHandler<SendPaymentErrorEmailCommand>
{
  private readonly logger = new Logger(
    SendPaymentErrorEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: SendPaymentErrorEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendPaymentErrorEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendPaymentErrorEmailCommandKeys>(
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
        throw new AppNotFoundException();
      }

      const currency = await this.findCurrencyByIdService.execute(
        data.payment.currency
      );
      if (!currency) {
        throw new CurrencyNotFoundException();
      }

      return await this.sendEmailService.execute({
        route: '/emails/payment-error',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
          subtotalAmount: data.payment.subtotalAmount,
          totalAmount: data.payment.totalAmount
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
    command: SendPaymentErrorEmailCommand
  ): SendPaymentErrorEmailCommand {
    return cleanObject({
      payment: command?.payment,
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
