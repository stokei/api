import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AppModel } from '@/models/app.model';

export const CurrentApp = createParamDecorator(
  (data: keyof AppModel, context: ExecutionContext): AppModel => {
    const request =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    if (data) {
      return request.app && request.app[data];
    }
    return request.app;
  }
);
