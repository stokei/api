import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePaymentsMethodCommand } from '@/commands/implements/payments-methods/create-payments-method.command';
import {
  PaymentsMethodNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreatePaymentsMethodRepository } from '@/repositories/payments-methods/create-payments-method';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreatePaymentsMethodCommandKeys = keyof CreatePaymentsMethodCommand;

@CommandHandler(CreatePaymentsMethodCommand)
export class CreatePaymentsMethodCommandHandler
  implements ICommandHandler<CreatePaymentsMethodCommand>
{
  constructor(
    private readonly createPaymentsMethodRepository: CreatePaymentsMethodRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentsMethodCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePaymentsMethodCommandKeys>(
        'parent'
      );
    }

    const paymentsMethodCreated =
      await this.createPaymentsMethodRepository.execute(data);
    if (!paymentsMethodCreated) {
      throw new PaymentsMethodNotFoundException();
    }
    const paymentsMethodModel = this.publisher.mergeObjectContext(
      paymentsMethodCreated
    );
    paymentsMethodModel.createdPaymentsMethod();
    paymentsMethodModel.commit();

    return paymentsMethodCreated;
  }

  private clearData(
    command: CreatePaymentsMethodCommand
  ): CreatePaymentsMethodCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
