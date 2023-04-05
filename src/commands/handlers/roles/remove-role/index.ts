import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveRoleCommand } from '@/commands/implements/roles/remove-role.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RoleNotFoundException
} from '@/errors';
import { RoleModel } from '@/models/role.model';
import { RemoveRoleRepository } from '@/repositories/roles/remove-role';
import { FindAllRolesService } from '@/services/roles/find-all-roles';
import { FindRoleByIdService } from '@/services/roles/find-role-by-id';

@CommandHandler(RemoveRoleCommand)
export class RemoveRoleCommandHandler
  implements ICommandHandler<RemoveRoleCommand>
{
  constructor(
    private readonly findRoleByIdService: FindRoleByIdService,
    private readonly findAllRolesService: FindAllRolesService,
    private readonly removeRoleRepository: RemoveRoleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveRoleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    let role: RoleModel;
    try {
      role = await this.findRoleByIdService.execute(data.where?.role);
      if (!role) {
        throw new RoleNotFoundException();
      }
    } catch (error) {
      const roles = await this.findAllRolesService.execute({
        where: {
          AND: {
            name: {
              equals: data.where?.name
            },
            parent: {
              equals: data.where?.parent
            }
          }
        },
        page: {
          limit: 1
        }
      });
      if (roles?.totalCount > 0) {
        role = roles?.items[0];
      }
      if (!role) {
        throw new RoleNotFoundException();
      }
    }

    const removed = await this.removeRoleRepository.execute({
      where: {
        ...data.where,
        role: splitServiceId(data.where?.role)?.id
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const roleModel = this.publisher.mergeObjectContext(role);
    roleModel.removedRole({
      removedBy: data.where.removedBy
    });
    roleModel.commit();

    return role;
  }

  private clearData(command: RemoveRoleCommand): RemoveRoleCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        role: cleanValue(command?.where?.role),
        name: cleanValue(command?.where?.name),
        parent: cleanValue(command?.where?.parent)
      })
    });
  }
}
