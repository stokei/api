import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppGuard } from '@/common/guards/app';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { FindVersionWithComponentsService } from '@/services/versions/find-version-with-components';

@ApiTags(REST_CONTROLLERS_URL_NAMES.VERSIONS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.VERSIONS,
  version: REST_VERSIONS.V1
})
export class GetVersionController {
  constructor(
    private readonly findVersionWithComponentsService: FindVersionWithComponentsService
  ) {}

  @Get(':version')
  @UseGuards(AppGuard)
  async getPage(@Param('version') versionId: string) {
    return await this.findVersionWithComponentsService.execute(versionId);
  }
}
