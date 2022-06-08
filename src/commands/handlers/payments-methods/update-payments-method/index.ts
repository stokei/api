import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePaymentsMethodCommand } from '@/commands/implements/payments-methods/update-payments-method.command';
import {
  PaymentsMethodNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPaymentsMethodByIdRepository } from '@/repositories/payments-methods/find-payments-method-by-id';
import { UpdatePaymentsMethodRepository } from '@/repositories/payments-methods/update-payments-method';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdatePaymentsMethodCommandKeys = keyof UpdatePaymentsMethodCommand;

@CommandHandler(UpdatePaymentsMethodCommand)
export class UpdatePaymentsMethodCommandHandler
  implements ICommandHandler<UpdatePaymentsMethodCommand>
{
  constructor(
    private readonly findPaymentsMethodByIdRepository: FindPaymentsMethodByIdRepository,
    private readonly updatePaymentsMethodRepository: UpdatePaymentsMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePaymentsMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
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

    const updated = await this.updatePaymentsMethodRepository.execute({
      ...data,
      where: {
        ...data.where,
        paymentsMethodId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const paymentsMethodUpdated =
      await this.findPaymentsMethodByIdRepository.execute(paymentsMethodId);
    if (!paymentsMethodUpdated) {
      throw new PaymentsMethodNotFoundException();
    }
    const paymentsMethodModel = this.publisher.mergeObjectContext(
      paymentsMethodUpdated
    );
    paymentsMethodModel.updatedPaymentsMethod();
    paymentsMethodModel.commit();

    return paymentsMethodUpdated;
  }

  private clearData(
    command: UpdatePaymentsMethodCommand
  ): UpdatePaymentsMethodCommand {
    return cleanObject({
      where: cleanObject({
        paymentsMethodId: cleanValue(command?.where?.paymentsMethodId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
