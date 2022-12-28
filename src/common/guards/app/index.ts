import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { extractRequestFromContext, isBoolean } from '@stokei/nestjs';

import { APP_CONFIG } from '@/common/decorators/app-config.decorator';
import { APP_ID_HEADER_NAME } from '@/constants/app-header-names';
import { AppUnauthorizedException } from '@/errors';
import { IAppConfigDecorator } from '@/interfaces';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private findAppByIdService: FindAppByIdService,
    private reflector: Reflector
  ) {}

  getRequest(context: ExecutionContext) {
    return extractRequestFromContext(context);
  }

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const config =
      this.reflector.getAllAndOverride<IAppConfigDecorator>(APP_CONFIG, [
        context.getHandler(),
        context.getClass()
      ]) || {};

    config.isRequired = isBoolean(config?.isRequired)
      ? config?.isRequired === true
      : true;
    config.isAllowedToUsePlan = isBoolean(config?.isAllowedToUsePlan)
      ? config?.isAllowedToUsePlan === true
      : null;

    if (config && !config?.isRequired) {
      return true;
    }
    const appId = request?.headers[APP_ID_HEADER_NAME];
    if (!appId) {
      throw new UnauthorizedException();
    }
    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppUnauthorizedException();
    }
    if (
      isBoolean(config.isAllowedToUsePlan) &&
      config.isAllowedToUsePlan !== app.isAllowedToUsePlan
    ) {
      throw new AppUnauthorizedException();
    }
    request.app = app;
    return true;
  }
}
