import { NotFoundException } from '@nestjs/common';

export class ActivitiesActionNotFoundException extends NotFoundException {
  constructor() {
    super('activitiesActionNotFound');
  }
}
