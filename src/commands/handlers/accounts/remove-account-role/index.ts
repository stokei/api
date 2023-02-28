import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAccountRoleCommand } from '@/commands/implements/accounts/remove-account-role.command';
import { AccountNotFoundException } from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { UpdateAccountService } from '@/services/accounts/update-account';

@CommandHandler(RemoveAccountRoleCommand)
export class RemoveAccountRoleCommandHandler
  implements ICommandHandler<RemoveAccountRoleCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly updateAccountService: UpdateAccountService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAccountRoleCommand) {
    const data = this.clearData(command);

    const account = await this.findAccountByIdService.execute(data.account);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const hasRole = account.roles?.some((role) => role === data.role);
    if (!hasRole) {
      return account;
    }

    const roles = account.roles?.filter((role) => role !== data.role) || [];
    const accountUpdated = await this.updateAccountService.execute({
      data: {
        roles,
        updatedBy: data.removedBy
      },
      where: {
        account: account.id,
        app: account.app
      }
    });
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.removedRoleAccount({
      role: data.role,
      removedBy: data.removedBy
    });
    accountModel.commit();
    return accountUpdated;
  }

  private clearData(
    command: RemoveAccountRoleCommand
  ): RemoveAccountRoleCommand {
    return cleanObject({
      role: cleanValue(command?.role),
      account: cleanValue(command?.account),
      removedBy: cleanValue(command?.removedBy)
    });
  }
}
