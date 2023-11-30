import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { FileModel } from '@/models/file.model';
import { ImageModel } from '@/models/image.model';
import { ProductModel } from '@/models/product.model';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { FindImageByIdService } from '@/services/images/find-image-by-id';
import { FindProductParentByParentService } from '@/services/products/find-product-parent-by-parent';

interface Response {
  image: ImageModel;
  file: FileModel;
}

@Injectable()
export class FindProductAvatarService
  implements IBaseService<ProductModel, Promise<Response>>
{
  constructor(
    private readonly findFileByIdService: FindFileByIdService,
    private readonly findImageByIdService: FindImageByIdService,
    private readonly findProductParentByParentService: FindProductParentByParentService
  ) {}

  async execute(product: ProductModel): Promise<Response> {
    if (product.avatar) {
      try {
        const response = await this.getImageAndFileByImageId(product.avatar);
        if (response) {
          return response;
        }
      } catch (error) {}
    }
    if (!product.parent) {
      return;
    }
    try {
      const parent = await this.findProductParentByParentService.execute(
        product.parent
      );
      const parentAvatar = (parent as any)?.avatar;
      if (!parentAvatar) {
        return;
      }
      return await this.getImageAndFileByImageId(parentAvatar);
    } catch (error) {
      return;
    }
  }

  private async getImageAndFileByImageId(imageId: string): Promise<Response> {
    let image: ImageModel;
    let file: FileModel;
    try {
      image = await this.findImageByIdService.execute(imageId);
      if (!image) {
        return;
      }
    } catch (error) {}
    try {
      file = await this.findFileByIdService.execute(image.file);
    } catch (error) {}
    if (!file || !image) {
      return;
    }
    return {
      image,
      file
    };
  }
}
