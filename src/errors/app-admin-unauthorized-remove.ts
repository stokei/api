import { ForbiddenException } from '@nestjs/common';

export class AppAdminUnauthorizedRemoveException extends ForbiddenException {
  constructor() {
    super('appAdminUnauthorizedRemove');
  }
}
