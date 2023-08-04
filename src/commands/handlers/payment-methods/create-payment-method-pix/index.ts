import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodPixCommand } from '@/commands/implements/payment-methods/create-payment-method-pix.command';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { CreatePaymentMethodPixRepository } from '@/repositories/payment-methods/create-payment-method-pix';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

type CreatePaymentMethodPixCommandKeys = keyof CreatePaymentMethodPixCommand;

@CommandHandler(CreatePaymentMethodPixCommand)
export class CreatePaymentMethodPixCommandHandler
  implements ICommandHandler<CreatePaymentMethodPixCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createPaymentMethodRepository: CreatePaymentMethodPixRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentMethodPixCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePaymentMethodPixCommandKeys>(
        'app'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const paymentMethodCreated =
      await this.createPaymentMethodRepository.execute({
        ...data,
        paymentMethodType: PaymentMethodType.BOLETO
      });
    if (!paymentMethodCreated) {
      throw new PaymentMethodNotFoundException();
    }

    const paymentMethodModel =
      this.publisher.mergeObjectContext(paymentMethodCreated);
    paymentMethodModel.createdPaymentMethod({
      createdBy: data.createdBy
    });
    paymentMethodModel.commit();

    return paymentMethodCreated;
  }

  private clearData(
    command: CreatePaymentMethodPixCommand
  ): CreatePaymentMethodPixCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
