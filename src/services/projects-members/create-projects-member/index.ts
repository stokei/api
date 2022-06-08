import { CreateProjectsMemberCommand } from '@/commands/implements/projects-members/create-projects-member.command';
import { CreateProjectsMemberDTO } from '@/dtos/projects-members/create-projects-member.dto';
import { ProjectsMemberModel } from '@/models/projects-member.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateProjectsMemberService
  implements
    IBaseService<CreateProjectsMemberDTO, Promise<ProjectsMemberModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateProjectsMemberDTO): Promise<ProjectsMemberModel> {
    return await this.commandBus.execute(new CreateProjectsMemberCommand(data));
  }
}
