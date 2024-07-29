import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

import {
  ProductsNotFoundException,
  SubscriptionContractItemsNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { FileModel } from '@/models/file.model';
import { ImageModel } from '@/models/image.model';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllFilesService } from '@/services/files/find-all-files';
import { FindAllImagesService } from '@/services/images/find-all-images';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import {
  FindSubscriptionContractItemProductService,
  SubscriptionContractItemProduct
} from '@/services/subscription-contract-items/find-subscription-contract-item-product';

export interface FindSubscriptionContractItemsDataToEmailDTO {
  subscriptionContract: SubscriptionContractModel;
}
export interface FindSubscriptionContractItemsDataToEmailResponse {
  orderProduct?: string;
  product: SubscriptionContractItemProduct;
  subscriptionContractItem: SubscriptionContractItemModel;
  imageURL?: string;
}

@Injectable()
export class FindSubscriptionContractItemsDataToEmailService
  implements
    IBaseService<
      FindSubscriptionContractItemsDataToEmailDTO,
      Promise<FindSubscriptionContractItemsDataToEmailResponse[]>
    >
{
  constructor(
    private readonly findAllImagesService: FindAllImagesService,
    private readonly findAllFilesService: FindAllFilesService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly findSubscriptionContractItemProductService: FindSubscriptionContractItemProductService
  ) {}

  async execute(
    command: FindSubscriptionContractItemsDataToEmailDTO
  ): Promise<FindSubscriptionContractItemsDataToEmailResponse[]> {
    const data = this.clearData(command);
    if (!data.subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    const subscriptionContractItems =
      await this.findAllSubscriptionContractItemsService.execute({
        where: {
          AND: {
            parent: {
              equals: data.subscriptionContract.id
            }
          }
        }
      });
    if (!subscriptionContractItems?.totalCount) {
      throw new SubscriptionContractItemsNotFoundException();
    }
    const subscriptionContractItemProductIds =
      subscriptionContractItems?.items.map(
        (subscriptionContractItem) => subscriptionContractItem.product
      );
    const subscriptionContractItemProducts = await Promise.all(
      subscriptionContractItemProductIds?.map(
        async (productId) =>
          await this.findSubscriptionContractItemProductService.execute(
            productId
          )
      )
    );
    if (!subscriptionContractItemProducts?.length) {
      throw new ProductsNotFoundException();
    }
    const images = await this.getImages(subscriptionContractItemProducts);
    const files = await this.getFiles(images);
    const items = await Promise.all(
      subscriptionContractItems?.items.map(async (subscriptionContractItem) => {
        const subscriptionContractItemProduct =
          subscriptionContractItemProducts.find(
            (prod) => prod.id === subscriptionContractItem.product
          );
        if (!subscriptionContractItemProduct) {
          return;
        }
        const image = images?.find(
          (currentImage) =>
            currentImage.id === subscriptionContractItemProduct.avatar
        );
        let avatar: FileModel;
        if (image) {
          avatar = files?.find((currentFile) => currentFile.id === image?.file);
        }
        const response: FindSubscriptionContractItemsDataToEmailResponse = {
          orderProduct: subscriptionContractItem.orderProduct,
          product: subscriptionContractItemProduct,
          subscriptionContractItem,
          imageURL: avatar?.url
        };
        return response;
      })
    );
    return items?.filter(Boolean);
  }

  private clearData(
    command: FindSubscriptionContractItemsDataToEmailDTO
  ): FindSubscriptionContractItemsDataToEmailDTO {
    return cleanObject({
      subscriptionContract: command?.subscriptionContract
    });
  }

  private async getFiles(images: ImageModel[]) {
    if (!images?.length) {
      return;
    }
    const fileIds = images?.map((image) => image?.file);
    if (!!fileIds?.length) {
      return;
    }
    return (
      await this.findAllFilesService.execute({
        where: {
          AND: {
            ids: fileIds
          }
        }
      })
    )?.items;
  }

  private async getImages(subscriptionContractItemProducts: any[]) {
    const imageIds = subscriptionContractItemProducts.map(
      (product) => product?.avatar
    );
    if (!!imageIds?.length) {
      return;
    }
    return (
      await this.findAllImagesService.execute({
        where: {
          AND: {
            ids: imageIds
          }
        }
      })
    )?.items;
  }
}
