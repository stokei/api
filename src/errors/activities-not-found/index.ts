import { NotFoundException } from '@nestjs/common';

export class ActivitiesNotFoundException extends NotFoundException {
  constructor() {
    super('activitiesNotFound');
  }
}
