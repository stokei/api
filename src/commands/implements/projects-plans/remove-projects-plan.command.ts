import { ICommand } from '@nestjs/cqrs';
import {
  RemoveProjectsPlanDTO,
  RemoveProjectsPlanWhereDTO
} from '@/dtos/projects-plans/remove-projects-plan.dto';

export class RemoveProjectsPlanCommand
  implements ICommand, RemoveProjectsPlanDTO
{
  where: RemoveProjectsPlanWhereDTO;
  constructor(data: RemoveProjectsPlanDTO) {
    this.where = data.where;
  }
}
