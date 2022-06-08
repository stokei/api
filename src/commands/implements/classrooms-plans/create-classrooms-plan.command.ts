import { ICommand } from '@nestjs/cqrs';
import { CreateClassroomsPlanDTO } from '@/dtos/classrooms-plans/create-classrooms-plan.dto';

export class CreateClassroomsPlanCommand
  implements ICommand, CreateClassroomsPlanDTO
{
  name: string;
  parent: string;

  constructor(data: CreateClassroomsPlanDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
