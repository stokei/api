import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAppAdminCommand } from '@/commands/implements/app-admins/remove-app-admin.command';
import {
  AppAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAllAppAdminsRepository } from '@/repositories/app-admins/find-all-app-admins';
import { RemoveAppAdminRepository } from '@/repositories/app-admins/remove-app-admin';

@CommandHandler(RemoveAppAdminCommand)
export class RemoveAppAdminCommandHandler
  implements ICommandHandler<RemoveAppAdminCommand>
{
  constructor(
    private readonly findAllAppAdminsRepository: FindAllAppAdminsRepository,
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

    const appAdmins = await this.findAllAppAdminsRepository.execute({
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
    if (!appAdmins?.length) {
      throw new AppAdminNotFoundException();
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
