import { All, Controller, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { FileModel } from '@/models/file.model';
import { TusService } from '@/services/tus/tus-service';

@ApiTags(REST_CONTROLLERS_URL_NAMES.UPLOADS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS,
  version: REST_VERSIONS.V1
})
export class CreateUploadController {
  constructor(private readonly tusService: TusService) {}

  @All(':file')
  @ApiCreatedResponse({
    description: 'The file has been successfully created.',
    type: FileModel
  })
  async createFile(@Req() req, @Res() res) {
    return this.tusService.handleTus(req, res);
  }
}
