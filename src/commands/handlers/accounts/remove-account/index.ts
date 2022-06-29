import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveAccountCommand } from '@/commands/implements/accounts/remove-account.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { RemoveAccountRepository } from '@/repositories/accounts/remove-account';

@CommandHandler(RemoveAccountCommand)
export class RemoveAccountCommandHandler
  implements ICommandHandler<RemoveAccountCommand>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly removeAccountRepository: RemoveAccountRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAccountCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const accountId = splitServiceId(data.where?.accountId)?.id;
    if (!accountId) {
      throw new ParamNotFoundException('accountId');
    }

    const account = await this.findAccountByIdRepository.execute(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const removed = await this.removeAccountRepository.execute({
      where: {
        ...data.where,
        accountId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(account);
    accountModel.removedAccount({
      removedBy: data.where.removedBy
    });
    accountModel.commit();

    return account;
  }

  private clearData(command: RemoveAccountCommand): RemoveAccountCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        accountId: cleanValue(command?.where?.accountId)
      })
    });
  }
}
