import { UpdateProjectsMemberCommand } from '@/commands/implements/projects-members/update-projects-member.command';
import { UpdateProjectsMemberDTO } from '@/dtos/projects-members/update-projects-member.dto';
import { ProjectsMemberModel } from '@/models/projects-member.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateProjectsMemberService
  implements
    IBaseService<UpdateProjectsMemberDTO, Promise<ProjectsMemberModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateProjectsMemberDTO): Promise<ProjectsMemberModel> {
    return await this.commandBus.execute(new UpdateProjectsMemberCommand(data));
  }
}
