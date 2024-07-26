import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { FileModel } from '@/models/file.model';
import { ImageModel } from '@/models/image.model';
import { ProductModel } from '@/models/product.model';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { FindImageByIdService } from '@/services/images/find-image-by-id';
import { FindProductExternalReferenceByExternalReferenceService } from '@/services/products/find-product-external-reference-by-external-reference';

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
    private readonly findProductExternalReferenceByExternalReferenceService: FindProductExternalReferenceByExternalReferenceService
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
    if (!product.externalReference) {
      return;
    }
    try {
      const externalReference =
        await this.findProductExternalReferenceByExternalReferenceService.execute(
          product.externalReference
        );
      const externalReferenceAvatar = (externalReference as any)?.avatar;
      if (!externalReferenceAvatar) {
        return;
      }
      return await this.getImageAndFileByImageId(externalReferenceAvatar);
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
