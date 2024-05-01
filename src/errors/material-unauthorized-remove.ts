import { ForbiddenException } from '@nestjs/common';

export class MaterialUnauthorizedRemoveException extends ForbiddenException {
  constructor() {
    super('materialUnauthorizedRemove');
  }
}
