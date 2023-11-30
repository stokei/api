import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendPaymentSuccessfullyEmailCommand } from '@/commands/implements/emails/send-payment-successfully-email.command';
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

type SendPaymentSuccessfullyEmailCommandKeys =
  keyof SendPaymentSuccessfullyEmailCommand;

@CommandHandler(SendPaymentSuccessfullyEmailCommand)
export class SendPaymentSuccessfullyEmailCommandHandler
  implements ICommandHandler<SendPaymentSuccessfullyEmailCommand>
{
  private readonly logger = new Logger(
    SendPaymentSuccessfullyEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: SendPaymentSuccessfullyEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendPaymentSuccessfullyEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendPaymentSuccessfullyEmailCommandKeys>(
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
        route: '/emails/payment-successfully',
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
    command: SendPaymentSuccessfullyEmailCommand
  ): SendPaymentSuccessfullyEmailCommand {
    return cleanObject({
      payment: command?.payment,
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
