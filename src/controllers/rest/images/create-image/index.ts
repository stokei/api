import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  AuthenticationConfig,
  CurrentAccount
} from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ImageModel } from '@/models/image.model';
import { CreateImageService } from '@/services/images/create-image';

@ApiTags(REST_CONTROLLERS_URL_NAMES.IMAGES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.IMAGES,
  version: REST_VERSIONS.V1
})
export class CreateImageController {
  constructor(private readonly createImageService: CreateImageService) {}

  @Post()
  @UseGuards(AuthenticatedGuard, AppGuard)
  @AuthenticationConfig({ isRequired: false })
  @ApiCreatedResponse({
    description: 'The image has been successfully created.',
    type: ImageModel
  })
  async createImage(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string
  ) {
    return this.createImageService.execute({
      path: '',
      app: appId,
      createdBy: currentAccountId
    });
  }
}
