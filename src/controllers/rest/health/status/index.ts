import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller('status')
export class HealthAPIStatusController {
  @Get()
  @HealthCheck()
  getAPIStatus() {
    return { ok: true };
  }
}
