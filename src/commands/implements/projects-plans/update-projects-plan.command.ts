import { ICommand } from '@nestjs/cqrs';
import {
  UpdateProjectsPlanDTO,
  UpdateProjectsPlanDataDTO,
  UpdateProjectsPlanWhereDTO
} from '@/dtos/projects-plans/update-projects-plan.dto';

export class UpdateProjectsPlanCommand
  implements ICommand, UpdateProjectsPlanDTO
{
  data: UpdateProjectsPlanDataDTO;
  where: UpdateProjectsPlanWhereDTO;
  constructor(data: UpdateProjectsPlanDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
