import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppAdminCommand } from '@/commands/implements/app-admins/create-app-admin.command';
import {
  AccountAlreadyExistsException,
  AppAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAppAdminRepository } from '@/repositories/app-admins/create-app-admin';
import { ExistsAppAdminsRepository } from '@/repositories/app-admins/exists-app-admins';

type CreateAppAdminCommandKeys = keyof CreateAppAdminCommand;

@CommandHandler(CreateAppAdminCommand)
export class CreateAppAdminCommandHandler
  implements ICommandHandler<CreateAppAdminCommand>
{
  constructor(
    private readonly createAppAdminRepository: CreateAppAdminRepository,
    private readonly existsAppAdminsRepository: ExistsAppAdminsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAppAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppAdminCommandKeys>('app');
    }
    if (!data?.admin) {
      throw new ParamNotFoundException<CreateAppAdminCommandKeys>('admin');
    }
    const existsAppAdmin = await this.existsAppAdminsRepository.execute({
      where: {
        admin: data.admin,
        app: data.app
      }
    });
    if (existsAppAdmin) {
      throw new AccountAlreadyExistsException();
    }

    const appAdminCreated = await this.createAppAdminRepository.execute(data);
    if (!appAdminCreated) {
      throw new AppAdminNotFoundException();
    }
    const appAdminModel = this.publisher.mergeObjectContext(appAdminCreated);
    appAdminModel.createdAppAdmin({
      createdBy: data.createdBy
    });
    appAdminModel.commit();

    return appAdminCreated;
  }

  private clearData(command: CreateAppAdminCommand): CreateAppAdminCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      admin: cleanValue(command?.admin)
    });
  }
}
