import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ChangePaymentToPaidCommand } from '@/commands/implements/payments/change-payment-to-paid.command';
import { ChangePaymentToPaidRepositoryDataDTO } from '@/dtos/payments/change-payment-to-paid-repository.dto';
import { PaymentStatus } from '@/enums/payment-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { PaymentModel } from '@/models/payment.model';
import { ChangePaymentToPaidRepository } from '@/repositories/payments/change-payment-to-paid';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';

type ChangePaymentToPaidCommandKeys = keyof ChangePaymentToPaidCommand;

@CommandHandler(ChangePaymentToPaidCommand)
export class ChangePaymentToPaidCommandHandler
  implements ICommandHandler<ChangePaymentToPaidCommand>
{
  constructor(
    private readonly changePaymentToPaidRepository: ChangePaymentToPaidRepository,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangePaymentToPaidCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.payment) {
      throw new ParamNotFoundException<ChangePaymentToPaidCommandKeys>(
        'payment'
      );
    }

    const payment = await this.findPaymentByIdService.execute(data.payment);
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    const dataChangePaymentToPaid: ChangePaymentToPaidRepositoryDataDTO = {
      active: true,
      stripeCheckoutSession: data?.stripeCheckoutSession,
      status: PaymentStatus.PAID,
      paymentMethod: data.paymentMethod,
      paidAt: convertToISODateString(Date.now()),
      updatedBy: data.updatedBy
    };
    const paymentUpdated = await this.changePaymentToPaidRepository.execute({
      data: dataChangePaymentToPaid,
      where: {
        payment: splitServiceId(payment.id)?.id
      }
    });
    if (!paymentUpdated) {
      throw new PaymentNotFoundException();
    }
    const paymentChanged = new PaymentModel({
      ...payment,
      ...dataChangePaymentToPaid
    });
    const paymentModel = this.publisher.mergeObjectContext(paymentChanged);
    paymentModel.changedPaymentToPaid({
      updatedBy: data.updatedBy
    });
    paymentModel.commit();

    return paymentChanged;
  }

  private clearData(
    command: ChangePaymentToPaidCommand
  ): ChangePaymentToPaidCommand {
    return cleanObject({
      payment: cleanValue(command?.payment),
      paymentMethod: cleanValue(command?.paymentMethod),
      stripeCheckoutSession: cleanValue(command?.stripeCheckoutSession),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
