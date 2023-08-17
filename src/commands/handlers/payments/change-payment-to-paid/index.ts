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
  AppNotFoundException,
  DataNotFoundException,
  PaymentNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { PaymentModel } from '@/models/payment.model';
import { ChangePaymentToPaidRepository } from '@/repositories/payments/change-payment-to-paid';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type ChangePaymentToPaidCommandKeys = keyof ChangePaymentToPaidCommand;

@CommandHandler(ChangePaymentToPaidCommand)
export class ChangePaymentToPaidCommandHandler
  implements ICommandHandler<ChangePaymentToPaidCommand>
{
  constructor(
    private readonly changePaymentToPaidRepository: ChangePaymentToPaidRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangePaymentToPaidCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<ChangePaymentToPaidCommandKeys>('app');
    }
    if (!data?.payment) {
      throw new ParamNotFoundException<ChangePaymentToPaidCommandKeys>(
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
    const subscriptionContract =
      await this.findSubscriptionContractByIdService.execute(
        payment.subscription
      );
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    const dataChangePaymentToPaid: ChangePaymentToPaidRepositoryDataDTO = {
      active: true,
      url: data.paymentUrl,
      status: PaymentStatus.PAID,
      paymentMethod: data.paymentMethod,
      paidAt: convertToISODateString(Date.now()),
      updatedBy: data.updatedBy
    };
    const paymentUpdated = await this.changePaymentToPaidRepository.execute({
      data: dataChangePaymentToPaid,
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
      ...dataChangePaymentToPaid
    });
    const paymentModel = this.publisher.mergeObjectContext(paymentChanged);
    paymentModel.changedPaymentToPaid();
    paymentModel.commit();

    return paymentChanged;
  }

  private clearData(
    command: ChangePaymentToPaidCommand
  ): ChangePaymentToPaidCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      payment: cleanValue(command?.payment),
      paymentUrl: cleanValue(command?.paymentUrl),
      paymentMethod: cleanValue(command?.paymentMethod),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
