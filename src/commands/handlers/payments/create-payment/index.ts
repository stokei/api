import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreatePaymentCommand } from '@/commands/implements/payments/create-payment.command';
import { PaymentStatus } from '@/enums/payment-status.enum';
import { APPLICATION_FEE_PERCENT } from '@/environments';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { CreatePaymentRepository } from '@/repositories/payments/create-payment';
import { getFeeAmount } from '@/utils/get-fee-amount';

type CreatePaymentCommandKeys = keyof CreatePaymentCommand;

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentCommandHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    private readonly createPaymentRepository: CreatePaymentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePaymentCommandKeys>('parent');
    }

    const paymentCreated = await this.createPaymentRepository.execute({
      ...data,
      feeAmount: getFeeAmount({
        amount: data.totalAmount,
        feePercentage: APPLICATION_FEE_PERCENT
      }),
      status: PaymentStatus.PENDING,
      active: true
    });
    if (!paymentCreated) {
      throw new PaymentNotFoundException();
    }
    const paymentModel = this.publisher.mergeObjectContext(paymentCreated);
    paymentModel.createdPayment({
      createdBy: data.createdBy
    });
    paymentModel.commit();

    return paymentCreated;
  }

  private clearData(command: CreatePaymentCommand): CreatePaymentCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      currency: cleanValue(command?.currency),
      paymentMethod: cleanValue(command?.paymentMethod),
      stripeCheckoutSession: cleanValue(command?.stripeCheckoutSession),
      totalAmount: cleanValueNumber(command?.totalAmount),
      subtotalAmount: cleanValueNumber(command?.subtotalAmount)
    });
  }
}
