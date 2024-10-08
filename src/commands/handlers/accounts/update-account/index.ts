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
    const accountId = splitServiceId(data.where?.account)?.id;
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
        account: accountId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const accountUpdated =
      await this.findAccountByIdRepository.execute(accountId);
    if (!accountUpdated) {
      throw new AccountNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.updatedAccount({
      updatedBy: data.data.updatedBy
    });
    accountModel.commit();

    return accountUpdated;
  }

  private clearData(command: UpdateAccountCommand): UpdateAccountCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        account: cleanValue(command?.where?.account)
      }),
      data: cleanObject({
        avatar: cleanValue(command?.data?.avatar),
        dateBirthday: cleanValue(command?.data?.dateBirthday),
        stripeCustomer: cleanValue(command?.data?.stripeCustomer),
        pagarmeCustomer: cleanValue(command?.data?.pagarmeCustomer),
        firstname: cleanValue(command?.data?.firstname),
        lastname: cleanValue(command?.data?.lastname),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
