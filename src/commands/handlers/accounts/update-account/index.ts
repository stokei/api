import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateAccountCommand } from '@/commands/implements/accounts/update-account.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { UpdateAccountRepository } from '@/repositories/accounts/update-account';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountCommandHandler
  implements ICommandHandler<UpdateAccountCommand>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly updateAccountRepository: UpdateAccountRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateAccountCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const accountId = splitServiceId(data.where?.accountId)?.id;
    if (!accountId) {
      throw new ParamNotFoundException('accountId');
    }

    const account = await this.findAccountByIdRepository.execute(accountId);
    if (!account || !account?.active) {
      throw new AccountNotFoundException();
    }

    const updated = await this.updateAccountRepository.execute({
      ...data,
      where: {
        ...data.where,
        accountId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const accountUpdated = await this.findAccountByIdRepository.execute(
      accountId
    );
    if (!accountUpdated) {
      throw new AccountNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.updatedAccount();
    accountModel.commit();

    return accountUpdated;
  }

  private clearData(command: UpdateAccountCommand): UpdateAccountCommand {
    return cleanObject({
      where: cleanObject({
        accountId: cleanValue(command?.where?.accountId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
