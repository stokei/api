import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';

import {
  ProductsNotFoundException,
  SubscriptionContractItemsNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { FileModel } from '@/models/file.model';
import { ImageModel } from '@/models/image.model';
import { OrderItemModel } from '@/models/order-item.model';
import { ProductModel } from '@/models/product.model';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllFilesService } from '@/services/files/find-all-files';
import { FindAllImagesService } from '@/services/images/find-all-images';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';
import { FindAllProductsService } from '@/services/products/find-all-products';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import {
  FindSubscriptionContractItemProductService,
  SubscriptionContractItemProduct
} from '@/services/subscription-contract-items/find-subscription-contract-item-product';

export interface FindSubscriptionContractItemsDataToEmailDTO {
  subscriptionContract: SubscriptionContractModel;
}
export interface FindSubscriptionContractItemsDataToEmailResponse {
  product: ProductModel;
  productReference: SubscriptionContractItemProduct;
  subscriptionContractItem: SubscriptionContractItemModel;
  orderItem?: OrderItemModel;
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
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllProductsService: FindAllProductsService,
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
    const orderItems = await this.getOrderItems(
      data.subscriptionContract.order
    );
    const products = await this.getProducts({ orderItems });
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

        let product = subscriptionContractItemProduct as ProductModel;
        let orderItem: OrderItemModel;
        const productReference = subscriptionContractItemProduct;
        if (orderItems?.length) {
          const productAndOrderItem = this.getProductAndOrderItem({
            orderItems,
            products,
            subscriptionContractItemProductId:
              subscriptionContractItemProduct.id
          });
          if (productAndOrderItem) {
            product = productAndOrderItem.product;
            orderItem = productAndOrderItem.orderItem;
          }
        }
        return {
          product,
          productReference,
          orderItem,
          subscriptionContractItem,
          imageURL: avatar?.url
        } as FindSubscriptionContractItemsDataToEmailResponse;
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

  private getProductAndOrderItem({
    orderItems,
    products,
    subscriptionContractItemProductId
  }: {
    orderItems: OrderItemModel[];
    products: ProductModel[];
    subscriptionContractItemProductId: string;
  }): {
    orderItem: OrderItemModel;
    product: ProductModel;
  } {
    const orderItem = orderItems?.find((item) => {
      if (item.product === subscriptionContractItemProductId) {
        return true;
      }
      return !!products?.find((prod) => prod.parent === item.product);
    });
    if (!orderItem) {
      return;
    }
    const product = products?.find(
      (prod) => prod.parent === orderItem?.product
    );
    return {
      orderItem,
      product
    };
  }

  private async getProducts({ orderItems }: { orderItems: OrderItemModel[] }) {
    const productsIds = orderItems?.map((item) => item.product);
    if (!productsIds?.length) {
      return;
    }
    const productsResponse = await this.findAllProductsService.execute({
      where: {
        AND: {
          ids: productsIds
        }
      }
    });
    if (!productsResponse?.totalCount) {
      return;
    }
    return productsResponse?.items;
  }

  private async getOrderItems(orderId: string) {
    if (!orderId) {
      return;
    }
    try {
      const orderItemsResponse = await this.findAllOrderItemsService.execute({
        where: {
          AND: {
            parent: {
              equals: orderId
            }
          }
        }
      });
      if (orderItemsResponse?.totalCount > 0) {
        return orderItemsResponse.items;
      }
    } catch (error) {}
    return;
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
