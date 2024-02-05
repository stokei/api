import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentMethodBoletoCommand } from '@/commands/implements/payment-methods/create-payment-method-boleto.command';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { CreatePaymentMethodBoletoRepository } from '@/repositories/payment-methods/create-payment-method-boleto';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

type CreatePaymentMethodBoletoCommandKeys =
  keyof CreatePaymentMethodBoletoCommand;

@CommandHandler(CreatePaymentMethodBoletoCommand)
export class CreatePaymentMethodBoletoCommandHandler
  implements ICommandHandler<CreatePaymentMethodBoletoCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createPaymentMethodRepository: CreatePaymentMethodBoletoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentMethodBoletoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePaymentMethodBoletoCommandKeys>(
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
    command: CreatePaymentMethodBoletoCommand
  ): CreatePaymentMethodBoletoCommand {
    return cleanObject({
      boletoLine: cleanValue(command?.boletoLine),
      boletoBarcode: cleanValue(command?.boletoBarcode),
      boletoURL: cleanValue(command?.boletoURL),
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
