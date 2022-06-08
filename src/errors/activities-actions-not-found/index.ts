import { NotFoundException } from '@nestjs/common';

export class ActivitiesActionsNotFoundException extends NotFoundException {
  constructor() {
    super('activitiesActionsNotFound');
  }
}
