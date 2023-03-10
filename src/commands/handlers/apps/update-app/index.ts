import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateAppCommand } from '@/commands/implements/apps/update-app.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppByIdRepository } from '@/repositories/apps/find-app-by-id';
import { UpdateAppRepository } from '@/repositories/apps/update-app';

@CommandHandler(UpdateAppCommand)
export class UpdateAppCommandHandler
  implements ICommandHandler<UpdateAppCommand>
{
  constructor(
    private readonly findAppByIdRepository: FindAppByIdRepository,
    private readonly updateAppRepository: UpdateAppRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateAppCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const appId = splitServiceId(data.where?.app)?.id;
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }

    const app = await this.findAppByIdRepository.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }

    const updated = await this.updateAppRepository.execute({
      ...data,
      where: {
        ...data.where,
        app: appId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const appUpdated = await this.findAppByIdRepository.execute(appId);
    if (!appUpdated) {
      throw new AppNotFoundException();
    }
    const appModel = this.publisher.mergeObjectContext(appUpdated);
    appModel.updatedApp({
      updatedBy: data.data.updatedBy
    });
    appModel.commit();

    return appUpdated;
  }

  private clearData(command: UpdateAppCommand): UpdateAppCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        description: cleanValue(command?.data?.description),
        avatar: cleanValue(command?.data?.avatar),
        hero: cleanValue(command?.data?.hero),
        icon: cleanValue(command?.data?.icon),
        logo: cleanValue(command?.data?.logo),
        stripeBankAccount: cleanValue(command?.data?.stripeBankAccount),
        stripeAccount: cleanValue(command?.data?.stripeAccount),
        stripeCustomer: cleanValue(command?.data?.stripeCustomer),
        paymentMethod: cleanValue(command?.data?.paymentMethod),
        updatedBy: cleanValue(command?.data?.name)
      })
    });
  }
}
