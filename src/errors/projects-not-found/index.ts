import { NotFoundException } from '@nestjs/common';

export class ProjectsNotFoundException extends NotFoundException {
  constructor() {
    super('projectsNotFound');
  }
}
