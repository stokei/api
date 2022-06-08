import { NotFoundException } from '@nestjs/common';

export class ProjectsMembersNotFoundException extends NotFoundException {
  constructor() {
    super('projectsMembersNotFound');
  }
}
