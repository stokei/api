import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateVideoUploadURLResponse } from '@/controllers/graphql/types/create-video-upload-url-response';
import { CreateVideoUploadURLService } from '@/services/files/create-video-upload-url';

@Resolver(() => CreateVideoUploadURLResponse)
export class CreateVideoUploadURLResolver {
  constructor(
    private readonly createVideoUploadURLService: CreateVideoUploadURLService
  ) {}

  @UseGuards(AppGuard, AuthenticatedGuard)
  @Mutation(() => CreateVideoUploadURLResponse)
  async createVideoUploadURL(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.createVideoUploadURLService.execute({
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
