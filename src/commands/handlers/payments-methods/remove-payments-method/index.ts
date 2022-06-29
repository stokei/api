import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemovePaymentsMethodCommand } from '@/commands/implements/payments-methods/remove-payments-method.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentsMethodNotFoundException
} from '@/errors';
import { FindPaymentsMethodByIdRepository } from '@/repositories/payments-methods/find-payments-method-by-id';
import { RemovePaymentsMethodRepository } from '@/repositories/payments-methods/remove-payments-method';

type RemovePaymentsMethodCommandKeys = keyof RemovePaymentsMethodCommand;

@CommandHandler(RemovePaymentsMethodCommand)
export class RemovePaymentsMethodCommandHandler
  implements ICommandHandler<RemovePaymentsMethodCommand>
{
  constructor(
    private readonly findPaymentsMethodByIdRepository: FindPaymentsMethodByIdRepository,
    private readonly removePaymentsMethodRepository: RemovePaymentsMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePaymentsMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const paymentsMethodId = splitServiceId(data.where?.paymentsMethodId)?.id;
    if (!paymentsMethodId) {
      throw new ParamNotFoundException('paymentsMethodId');
    }

    const paymentsMethod = await this.findPaymentsMethodByIdRepository.execute(
      paymentsMethodId
    );
    if (!paymentsMethod) {
      throw new PaymentsMethodNotFoundException();
    }

    const removed = await this.removePaymentsMethodRepository.execute({
      where: {
        ...data.where,
        paymentsMethodId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const paymentsMethodModel =
      this.publisher.mergeObjectContext(paymentsMethod);
    paymentsMethodModel.removedPaymentsMethod();
    paymentsMethodModel.commit();

    return paymentsMethod;
  }

  private clearData(
    command: RemovePaymentsMethodCommand
  ): RemovePaymentsMethodCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        paymentsMethodId: cleanValue(command?.where?.paymentsMethodId)
      })
    });
  }
}
