import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateProductCommand } from '@/commands/implements/products/create-product.command';
import { ProductType } from '@/enums/product-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  ProductComboItemsNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { CreateProductRepository } from '@/repositories/products/create-product';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

type CreateProductCommandKeys = keyof CreateProductCommand;

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly createProductRepository: CreateProductRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProductCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProductCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateProductCommandKeys>('name');
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateProductCommandKeys>('app');
    }
    const isComboProduct = data.type === ProductType.COMBO;
    if (isComboProduct && !data?.comboProducts?.length) {
      throw new ProductComboItemsNotFoundException();
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const { catalogs, comboProducts, ...dataCreate } = data;
    const productCreated = await this.createProductRepository.execute(
      dataCreate
    );
    if (!productCreated) {
      throw new ProductNotFoundException();
    }
    const productModel = this.publisher.mergeObjectContext(productCreated);
    productModel.createdProduct({
      catalogs,
      comboProducts: isComboProduct ? comboProducts : [],
      createdBy: data.createdBy
    });
    productModel.commit();

    return productCreated;
  }

  private clearData(command: CreateProductCommand): CreateProductCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      type: cleanValue(command?.type),
      externalReference: cleanValue(command?.externalReference),
      description: cleanValue(command?.description),
      avatar: cleanValue(command?.avatar),
      parent: cleanValue(command?.parent),
      catalogs: command?.catalogs,
      comboProducts: command?.comboProducts
    });
  }
}
