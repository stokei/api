import { NotFoundException } from '@nestjs/common';

export class ProjectsPlanNotFoundException extends NotFoundException {
  constructor() {
    super('projectsPlanNotFound');
  }
}
