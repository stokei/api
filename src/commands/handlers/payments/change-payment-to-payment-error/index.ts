import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ChangePaymentToPaymentErrorCommand } from '@/commands/implements/payments/change-payment-to-payment-error.command';
import { ChangePaymentToPaymentErrorRepositoryDataDTO } from '@/dtos/payments/change-payment-to-payment-error-repository.dto';
import { PaymentStatus } from '@/enums/payment-status.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { PaymentModel } from '@/models/payment.model';
import { ChangePaymentToPaymentErrorRepository } from '@/repositories/payments/change-payment-to-payment-error';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';

type ChangePaymentToPaymentErrorCommandKeys =
  keyof ChangePaymentToPaymentErrorCommand;

@CommandHandler(ChangePaymentToPaymentErrorCommand)
export class ChangePaymentToPaymentErrorCommandHandler
  implements ICommandHandler<ChangePaymentToPaymentErrorCommand>
{
  constructor(
    private readonly changePaymentToPaymentErrorRepository: ChangePaymentToPaymentErrorRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangePaymentToPaymentErrorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<ChangePaymentToPaymentErrorCommandKeys>(
        'app'
      );
    }
    if (!data?.payment) {
      throw new ParamNotFoundException<ChangePaymentToPaymentErrorCommandKeys>(
        'payment'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const payment = await this.findPaymentByIdService.execute(data.payment);
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    const dataChangePaymentToPaymentError: ChangePaymentToPaymentErrorRepositoryDataDTO =
      {
        active: true,
        status: PaymentStatus.PAID,
        paymentMethod: data.paymentMethod,
        paymentErrorAt: convertToISODateString(Date.now()),
        updatedBy: data.updatedBy
      };
    const paymentUpdated =
      await this.changePaymentToPaymentErrorRepository.execute({
        data: dataChangePaymentToPaymentError,
        where: {
          app: app.id,
          payment: splitServiceId(payment.id)?.id
        }
      });
    if (!paymentUpdated) {
      throw new PaymentNotFoundException();
    }
    const paymentChanged = new PaymentModel({
      ...payment,
      ...dataChangePaymentToPaymentError
    });
    const paymentModel = this.publisher.mergeObjectContext(paymentChanged);
    paymentModel.changedPaymentToPaymentError({
      updatedBy: data.updatedBy
    });
    paymentModel.commit();

    return paymentChanged;
  }

  private clearData(
    command: ChangePaymentToPaymentErrorCommand
  ): ChangePaymentToPaymentErrorCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      payment: cleanValue(command?.payment),
      paymentMethod: cleanValue(command?.paymentMethod),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
