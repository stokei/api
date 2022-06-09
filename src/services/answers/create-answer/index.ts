import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAnswerCommand } from '@/commands/implements/answers/create-answer.command';
import { CreateAnswerDTO } from '@/dtos/answers/create-answer.dto';
import { AnswerModel } from '@/models/answer.model';

@Injectable()
export class CreateAnswerService
  implements IBaseService<CreateAnswerDTO, Promise<AnswerModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAnswerDTO): Promise<AnswerModel> {
    return await this.commandBus.execute(new CreateAnswerCommand(data));
  }
}
