import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAppAdminCommand } from '@/commands/implements/app-admins/remove-app-admin.command';
import {
  AppAdminNotFoundException,
  AppAdminUnauthorizedRemoveException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { RemoveAppAdminRepository } from '@/repositories/app-admins/remove-app-admin';
import { FindAllAppAdminsService } from '@/services/app-admins/find-all-app-admins';

@CommandHandler(RemoveAppAdminCommand)
export class RemoveAppAdminCommandHandler
  implements ICommandHandler<RemoveAppAdminCommand>
{
  constructor(
    private readonly findAllAppAdminsService: FindAllAppAdminsService,
    private readonly removeAppAdminRepository: RemoveAppAdminRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAppAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { app, admin } = data.where || {};
    if (!app) {
      throw new ParamNotFoundException('appId');
    }
    if (!admin) {
      throw new ParamNotFoundException('adminId');
    }

    const appAdmins = await this.findAllAppAdminsService.execute({
      where: {
        AND: {
          app: {
            equals: app
          },
          admin: {
            equals: admin
          }
        }
      }
    });
    if (!appAdmins?.totalCount) {
      throw new AppAdminNotFoundException();
    }
    if (appAdmins?.totalCount == 1) {
      throw new AppAdminUnauthorizedRemoveException();
    }
    const appAdmin = appAdmins[0];
    const removed = await this.removeAppAdminRepository.execute({
      where: {
        ...data.where,
        app,
        admin
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const appAdminModel = this.publisher.mergeObjectContext(appAdmin);
    appAdminModel.removedAppAdmin({
      removedBy: data.where.removedBy
    });
    appAdminModel.commit();

    return appAdmin;
  }

  private clearData(command: RemoveAppAdminCommand): RemoveAppAdminCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        admin: cleanValue(command?.where?.admin)
      })
    });
  }
}
