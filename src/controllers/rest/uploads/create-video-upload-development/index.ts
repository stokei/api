import { All, Controller, Post, Req, Res } from '@nestjs/common';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { TusService } from '@/services/tus/tus-service';

@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS_VIDEOS,
  version: REST_VERSIONS.V1
})
export class CreateVideoUploadDevelopmentController {
  constructor(private readonly tusService: TusService) {}

  @Post()
  async createFile(@Req() req, @Res() res) {
    return this.tusService.handleTus(req, res);
  }
  @All(':file')
  async changeFile(@Req() req, @Res() res) {
    return this.tusService.handleTus(req, res);
  }
}
