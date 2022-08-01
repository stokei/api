import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import { CreateAppCommand } from '@/commands/implements/apps/create-app.command';
import { defaultLanguageId } from '@/constants/default-language-id';
import { AppStatus } from '@/enums/app-status.enum';
import {
  AppNotFoundException,
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAppRepository } from '@/repositories/apps/create-app';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';
import { FindLanguageByIdService } from '@/services/languages/find-language-by-id';

type CreateAppCommandKeys = keyof CreateAppCommand;

@CommandHandler(CreateAppCommand)
export class CreateAppCommandHandler
  implements ICommandHandler<CreateAppCommand>
{
  constructor(
    private readonly createAppRepository: CreateAppRepository,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findLanguageByIdService: FindLanguageByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAppCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateAppCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateAppCommandKeys>('name');
    }
    if (!data?.currency) {
      throw new ParamNotFoundException<CreateAppCommandKeys>('currency');
    }

    const slug = cleanSlug(data.name + uuid());

    const currency = await this.findCurrencyByIdService.execute(data?.currency);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }
    const language = await this.findLanguageByIdService.execute(
      defaultLanguageId
    );
    if (!language) {
      throw new CurrencyNotFoundException();
    }

    const appCreated = await this.createAppRepository.execute({
      ...data,
      slug,
      currency: currency.id,
      language: language.id,
      status: AppStatus.ACTIVE
    });
    if (!appCreated) {
      throw new AppNotFoundException();
    }
    const appModel = this.publisher.mergeObjectContext(appCreated);
    appModel.createdApp({
      createdBy: data.createdBy
    });
    appModel.commit();

    return appCreated;
  }

  private clearData(command: CreateAppCommand): CreateAppCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      currency: cleanValue(command?.currency)
    });
  }
}
