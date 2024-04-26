import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateMaterialCommand } from '@/commands/implements/materials/update-material.command';
import {
  DataNotFoundException,
  MaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindMaterialByIdRepository } from '@/repositories/materials/find-material-by-id';
import { UpdateMaterialRepository } from '@/repositories/materials/update-material';

@CommandHandler(UpdateMaterialCommand)
export class UpdateMaterialCommandHandler
  implements ICommandHandler<UpdateMaterialCommand>
{
  constructor(
    private readonly findMaterialByIdRepository: FindMaterialByIdRepository,
    private readonly updateMaterialRepository: UpdateMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const materialId = splitServiceId(data.where?.material)?.id;
    if (!materialId) {
      throw new ParamNotFoundException('materialId');
    }

    const material = await this.findMaterialByIdRepository.execute(materialId);
    if (!material) {
      throw new MaterialNotFoundException();
    }

    const updated = await this.updateMaterialRepository.execute({
      ...data,
      where: {
        ...data.where,
        material: materialId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const materialUpdated =
      await this.findMaterialByIdRepository.execute(materialId);
    if (!materialUpdated) {
      throw new MaterialNotFoundException();
    }
    const materialModel = this.publisher.mergeObjectContext(materialUpdated);
    materialModel.updatedMaterial({
      updatedBy: data.data.updatedBy
    });
    materialModel.commit();

    return materialUpdated;
  }

  private clearData(command: UpdateMaterialCommand): UpdateMaterialCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        material: cleanValue(command?.where?.material)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        file: cleanValue(command?.data?.file),
        description: cleanValue(command?.data?.description),
        avatar: cleanValue(command?.data?.avatar),
        free: cleanValueBoolean(command?.data?.free),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
