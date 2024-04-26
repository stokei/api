import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemovePaymentMethodCommand } from '@/commands/implements/payment-methods/remove-payment-method.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodHasSubscriptionContractException,
  PaymentMethodIsUniqueException,
  PaymentMethodNotFoundException
} from '@/errors';
import { FindPaymentMethodByIdRepository } from '@/repositories/payment-methods/find-payment-method-by-id';
import { RemovePaymentMethodRepository } from '@/repositories/payment-methods/remove-payment-method';
import { FindAllPaymentMethodsService } from '@/services/payment-methods/find-all-payment-methods';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

@CommandHandler(RemovePaymentMethodCommand)
export class RemovePaymentMethodCommandHandler
  implements ICommandHandler<RemovePaymentMethodCommand>
{
  constructor(
    private readonly findPaymentMethodByIdRepository: FindPaymentMethodByIdRepository,
    private readonly findAllPaymentMethodsService: FindAllPaymentMethodsService,
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService,
    private readonly removePaymentMethodRepository: RemovePaymentMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePaymentMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const paymentMethodId = splitServiceId(data.where?.paymentMethod)?.id;
    if (!paymentMethodId) {
      throw new ParamNotFoundException('paymentMethodId');
    }

    const paymentMethod =
      await this.findPaymentMethodByIdRepository.execute(paymentMethodId);
    if (!paymentMethod) {
      throw new PaymentMethodNotFoundException();
    }

    const paymentMethods = await this.findAllPaymentMethodsService.execute({
      where: {
        AND: {
          parent: {
            equals: paymentMethod.parent
          },
          app: {
            equals: paymentMethod.app
          }
        }
      }
    });
    if (paymentMethods?.totalCount <= 1) {
      throw new PaymentMethodIsUniqueException();
    }

    const paymentMethodHasSubscription =
      await this.hasSubscriptionContractWithPaymentMethod(paymentMethod.id);
    if (!!paymentMethodHasSubscription) {
      throw new PaymentMethodHasSubscriptionContractException();
    }

    const removed = await this.removePaymentMethodRepository.execute({
      where: {
        ...data.where,
        paymentMethod: paymentMethodId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const paymentMethodModel = this.publisher.mergeObjectContext(paymentMethod);
    paymentMethodModel.removedPaymentMethod({
      removedBy: data.where.removedBy
    });
    paymentMethodModel.commit();

    return paymentMethod;
  }

  private async hasSubscriptionContractWithPaymentMethod(
    paymentMethod: string
  ): Promise<boolean> {
    const subscriptionContracts =
      await this.findAllSubscriptionContractsService.execute({
        where: {
          AND: {
            paymentMethod: {
              equals: paymentMethod
            }
          }
        },
        page: {
          limit: 1
        }
      });

    return subscriptionContracts?.totalCount > 0;
  }

  private clearData(
    command: RemovePaymentMethodCommand
  ): RemovePaymentMethodCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        paymentMethod: cleanValue(command?.where?.paymentMethod)
      })
    });
  }
}
