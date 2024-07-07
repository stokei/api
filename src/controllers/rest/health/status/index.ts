import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
@ApiTags(REST_CONTROLLERS_URL_NAMES.HEALTH_CHECKS.BASE)
@Controller(REST_CONTROLLERS_URL_NAMES.HEALTH_CHECKS.STATUS)
export class HealthAPIStatusController {
  @Get()
  @HealthCheck()
  getAPIStatus() {
    return { ok: true };
  }
}
