import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddAccountRoleCommand } from '@/commands/implements/accounts/add-account-role.command';
import { AccountNotFoundException } from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { UpdateAccountService } from '@/services/accounts/update-account';

@CommandHandler(AddAccountRoleCommand)
export class AddAccountRoleCommandHandler
  implements ICommandHandler<AddAccountRoleCommand>
{
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly updateAccountService: UpdateAccountService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: AddAccountRoleCommand) {
    const data = this.clearData(command);

    const account = await this.findAccountByIdService.execute(data.account);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const hasRole = account.roles?.some((role) => role === data.role);
    if (hasRole) {
      return account;
    }

    let roles = account.roles;
    const alreadyExistsRole = roles.some((role) => role === data.role);
    if (!alreadyExistsRole) {
      roles = [...roles, data.role];
    }
    const accountUpdated = await this.updateAccountService.execute({
      data: {
        roles,
        updatedBy: data.createdBy
      },
      where: {
        account: account.id,
        app: account.app
      }
    });
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.createdRoleAccount({
      role: data.role,
      createdBy: data.createdBy
    });
    accountModel.commit();
    return accountUpdated;
  }

  private clearData(command: AddAccountRoleCommand): AddAccountRoleCommand {
    return cleanObject({
      role: cleanValue(command?.role),
      account: cleanValue(command?.account),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
