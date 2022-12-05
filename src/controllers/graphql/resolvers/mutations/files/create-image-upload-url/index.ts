import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateImageUploadURLResponse } from '@/controllers/graphql/types/create-image-upload-url-response';
import { CreateImageUploadURLService } from '@/services/files/create-image-upload-url';

@Resolver(() => CreateImageUploadURLResponse)
export class CreateImageUploadURLResolver {
  constructor(
    private readonly createImageUploadURLService: CreateImageUploadURLService
  ) {}

  @UseGuards(AppGuard, AuthenticatedGuard)
  @Mutation(() => CreateImageUploadURLResponse)
  async createImageUploadURL(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.createImageUploadURLService.execute({
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
