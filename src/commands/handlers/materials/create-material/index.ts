import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueBoolean } from '@stokei/nestjs';

import { CreateMaterialCommand } from '@/commands/implements/materials/create-material.command';
import {
  DataNotFoundException,
  MaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateMaterialRepository } from '@/repositories/materials/create-material';

type CreateMaterialCommandKeys = keyof CreateMaterialCommand;

@CommandHandler(CreateMaterialCommand)
export class CreateMaterialCommandHandler
  implements ICommandHandler<CreateMaterialCommand>
{
  constructor(
    private readonly createMaterialRepository: CreateMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateMaterialCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateMaterialCommandKeys>('name');
    }
    if (!data?.file) {
      throw new ParamNotFoundException<CreateMaterialCommandKeys>('file');
    }

    const materialCreated = await this.createMaterialRepository.execute(data);
    if (!materialCreated) {
      throw new MaterialNotFoundException();
    }
    const materialModel = this.publisher.mergeObjectContext(materialCreated);
    materialModel.createdMaterial({
      createdBy: data.createdBy
    });
    materialModel.commit();

    return materialCreated;
  }

  private clearData(command: CreateMaterialCommand): CreateMaterialCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      file: cleanValue(command?.file),
      avatar: cleanValue(command?.avatar),
      free: cleanValueBoolean(command?.free),
      parent: cleanValue(command?.parent)
    });
  }
}
