import { NotFoundException } from '@nestjs/common';

export class RolesNotFoundException extends NotFoundException {
  constructor() {
    super('rolesNotFound');
  }
}
