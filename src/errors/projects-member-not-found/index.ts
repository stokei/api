import { NotFoundException } from '@nestjs/common';

export class ProjectsMemberNotFoundException extends NotFoundException {
  constructor() {
    super('projectsMemberNotFound');
  }
}
