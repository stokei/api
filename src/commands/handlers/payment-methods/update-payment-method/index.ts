import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePaymentMethodCommand } from '@/commands/implements/payment-methods/update-payment-method.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { UpdatePaymentMethodRepository } from '@/repositories/payment-methods/update-payment-method';
import { FindPaymentMethodByIdService } from '@/services/payment-methods/find-payment-method-by-id';

@CommandHandler(UpdatePaymentMethodCommand)
export class UpdatePaymentMethodCommandHandler
  implements ICommandHandler<UpdatePaymentMethodCommand>
{
  constructor(
    private readonly findPaymentMethodByIdService: FindPaymentMethodByIdService,
    private readonly updatePaymentMethodRepository: UpdatePaymentMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePaymentMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const paymentMethodId = splitServiceId(data.where?.paymentMethod)?.id;
    if (!paymentMethodId) {
      throw new ParamNotFoundException('paymentMethodId');
    }

    const paymentMethod = await this.findPaymentMethodByIdService.execute(
      data.where?.paymentMethod
    );
    if (!paymentMethod) {
      throw new PaymentMethodNotFoundException();
    }

    const updated = await this.updatePaymentMethodRepository.execute({
      ...data,
      where: {
        ...data.where,
        paymentMethod: paymentMethodId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const paymentUpdated = new PaymentMethodModel({
      ...paymentMethod,
      ...data.data
    });
    const paymentModel = this.publisher.mergeObjectContext(paymentUpdated);
    paymentModel.updatedPaymentMethod({
      updatedBy: data.data.updatedBy
    });
    paymentModel.commit();

    return paymentUpdated;
  }

  private clearData(
    command: UpdatePaymentMethodCommand
  ): UpdatePaymentMethodCommand {
    return cleanObject({
      where: cleanObject({
        paymentMethod: cleanValue(command?.where?.paymentMethod)
      }),
      data: cleanObject({
        referenceId: cleanValue(command?.data?.referenceId),
        lastFourCardNumber: cleanValue(command?.data?.lastFourCardNumber),
        cardBrand: cleanValue(command?.data?.cardBrand),
        cardExpiryMonth: cleanValue(command?.data?.cardExpiryMonth),
        cardExpiryYear: cleanValue(command?.data?.cardExpiryYear),
        paymentMethodType: cleanValue(command?.data?.paymentMethodType),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
