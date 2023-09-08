import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreateAppCommand } from '@/commands/implements/apps/create-app.command';
import { AppStatus } from '@/enums/app-status.enum';
import {
  AppNotFoundException,
  CurrencyNotFoundException,
  DataNotFoundException,
  LanguageNotFoundException,
  ParamNotFoundException,
  SlugAlreadyExistsException
} from '@/errors';
import { CreateAppRepository } from '@/repositories/apps/create-app';
import { FindAppBySlugService } from '@/services/apps/find-app-by-slug';
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
    private readonly findAppBySlugService: FindAppBySlugService,
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
    let slug = data.slug;
    if (!data.slug) {
      slug = cleanSlug(data.name + nanoid(8));
    }

    try {
      const appWithSlug = await this.findAppBySlugService.execute(slug);
      if (appWithSlug) {
        throw new SlugAlreadyExistsException();
      }
    } catch (error) {}

    const currency = await this.findCurrencyByIdService.execute(data?.currency);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }
    const language = await this.findLanguageByIdService.execute(data?.language);
    if (!language) {
      throw new LanguageNotFoundException();
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
      id: cleanValue(command?.id),
      slug: cleanValue(command?.slug),
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      email: cleanValue(command?.email),
      name: cleanValue(command?.name),
      language: cleanValue(command?.language),
      currency: cleanValue(command?.currency)
    });
  }
}
