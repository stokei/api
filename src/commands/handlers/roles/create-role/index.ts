import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateRoleCommand } from '@/commands/implements/roles/create-role.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RoleNotFoundException
} from '@/errors';
import { CreateRoleRepository } from '@/repositories/roles/create-role';
import { FindAllRolesService } from '@/services/roles/find-all-roles';

type CreateRoleCommandKeys = keyof CreateRoleCommand;

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler
  implements ICommandHandler<CreateRoleCommand>
{
  constructor(
    private readonly createRoleRepository: CreateRoleRepository,
    private readonly findAllRolesService: FindAllRolesService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateRoleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateRoleCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateRoleCommandKeys>('name');
    }

    const roles = await this.findAllRolesService.execute({
      where: {
        AND: {
          parent: {
            equals: data.parent
          },
          name: {
            equals: data.name
          }
        }
      },
      page: {
        limit: 1
      }
    });
    if (roles?.totalCount > 0) {
      return roles.items[0];
    }

    const roleCreated = await this.createRoleRepository.execute(data);
    if (!roleCreated) {
      throw new RoleNotFoundException();
    }
    const roleModel = this.publisher.mergeObjectContext(roleCreated);
    roleModel.createdRole({
      createdBy: data.createdBy
    });
    roleModel.commit();

    return roleCreated;
  }

  private clearData(command: CreateRoleCommand): CreateRoleCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
