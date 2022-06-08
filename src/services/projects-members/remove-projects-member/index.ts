import { RemoveProjectsMemberCommand } from '@/commands/implements/projects-members/remove-projects-member.command';
import { RemoveProjectsMemberDTO } from '@/dtos/projects-members/remove-projects-member.dto';
import { ProjectsMemberModel } from '@/models/projects-member.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveProjectsMemberService
  implements
    IBaseService<RemoveProjectsMemberDTO, Promise<ProjectsMemberModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveProjectsMemberDTO): Promise<ProjectsMemberModel> {
    return await this.commandBus.execute(new RemoveProjectsMemberCommand(data));
  }
}
