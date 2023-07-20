import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveMaterialCommand } from '@/commands/implements/materials/remove-material.command';
import {
  DataNotFoundException,
  MaterialNotFoundException,
  MaterialUnauthorizedRemoveException,
  ParamNotFoundException
} from '@/errors';
import { RemoveMaterialRepository } from '@/repositories/materials/remove-material';
import { FindMaterialByIdService } from '@/services/materials/find-material-by-id';
import { FindAllProductsService } from '@/services/products/find-all-products';

@CommandHandler(RemoveMaterialCommand)
export class RemoveMaterialCommandHandler
  implements ICommandHandler<RemoveMaterialCommand>
{
  constructor(
    private readonly findMaterialByIdService: FindMaterialByIdService,
    private readonly removeMaterialRepository: RemoveMaterialRepository,
    private readonly findAllProductsService: FindAllProductsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const materialId = splitServiceId(data.where?.material)?.id;
    if (!materialId) {
      throw new ParamNotFoundException('materialId');
    }

    const material = await this.findMaterialByIdService.execute(
      data.where?.material
    );
    if (!material) {
      throw new MaterialNotFoundException();
    }

    const existsProducts = await this.hasProducts(material.id);
    if (existsProducts) {
      throw new MaterialUnauthorizedRemoveException();
    }

    const removed = await this.removeMaterialRepository.execute({
      where: {
        ...data.where,
        material: materialId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const materialModel = this.publisher.mergeObjectContext(material);
    materialModel.removedMaterial({
      removedBy: data.where.removedBy
    });
    materialModel.commit();

    return material;
  }

  private clearData(command: RemoveMaterialCommand): RemoveMaterialCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        material: cleanValue(command?.where?.material)
      })
    });
  }

  private async hasProducts(materialId: string) {
    const products = await this.findAllProductsService.execute({
      where: {
        AND: {
          parent: {
            equals: materialId
          }
        }
      },
      page: {
        limit: 1
      }
    });
    return products?.totalCount > 0;
  }
}
