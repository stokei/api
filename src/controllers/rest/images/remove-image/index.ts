import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  AuthenticationConfig,
  CurrentAccount
} from '@stokei/nestjs';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ImageModel } from '@/models/image.model';
import { RemoveImageService } from '@/services/images/remove-image';

@ApiTags(REST_CONTROLLERS_URL_NAMES.IMAGES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.IMAGES,
  version: REST_VERSIONS.V1
})
export class RemoveImageController {
  constructor(private readonly removeImageService: RemoveImageService) {}

  @Delete()
  @UseGuards(AuthenticatedGuard)
  @AuthenticationConfig({ isRequired: false })
  @ApiOkResponse({
    description: 'The image has been successfully deleted.',
    type: ImageModel
  })
  async removeImage(
    @Param('id') imageId: string,
    @CurrentAccount('id') currentAccountId: string
  ) {
    return this.removeImageService.execute({
      where: {
        imageId,
        removedBy: currentAccountId
      }
    });
  }
}
