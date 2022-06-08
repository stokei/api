import { ICommand } from '@nestjs/cqrs';
import { CreateActivitiesActionDTO } from '@/dtos/activities-actions/create-activities-action.dto';

export class CreateActivitiesActionCommand
  implements ICommand, CreateActivitiesActionDTO
{
  name: string;
  parent: string;

  constructor(data: CreateActivitiesActionDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
