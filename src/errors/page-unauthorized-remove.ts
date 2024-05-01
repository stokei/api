import { ForbiddenException } from '@nestjs/common';

export class PageUnauthorizedRemoveException extends ForbiddenException {
  constructor() {
    super('pageUnauthorizedRemove');
  }
}
