import { NotFoundException } from '@nestjs/common';

export class ProjectsPlansNotFoundException extends NotFoundException {
  constructor() {
    super('projectsPlansNotFound');
  }
}
