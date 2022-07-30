import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentCommand } from '@/commands/implements/payments/create-payment.command';
import { PaymentStatus } from '@/enums/payment-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { CreatePaymentRepository } from '@/repositories/payments/create-payment';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';

type CreatePaymentCommandKeys = keyof CreatePaymentCommand;

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentCommandHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    private readonly createPaymentRepository: CreatePaymentRepository,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.order) {
      throw new ParamNotFoundException<CreatePaymentCommandKeys>('order');
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreatePaymentCommandKeys>('customer');
    }
    if (!data?.paymentMethod) {
      throw new ParamNotFoundException<CreatePaymentCommandKeys>(
        'paymentMethod'
      );
    }
    const order = await this.findOrderByIdService.execute(data.order);

    const paymentCreated = await this.createPaymentRepository.execute({
      ...data,
      amount: order.amount,
      externalPayment: null,
      status: PaymentStatus.PENDING
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
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      order: cleanValue(command?.order),
      paymentMethod: cleanValue(command?.paymentMethod)
    });
  }
}
