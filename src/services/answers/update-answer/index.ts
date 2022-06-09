import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateAnswerCommand } from '@/commands/implements/answers/update-answer.command';
import { UpdateAnswerDTO } from '@/dtos/answers/update-answer.dto';
import { AnswerModel } from '@/models/answer.model';

@Injectable()
export class UpdateAnswerService
  implements IBaseService<UpdateAnswerDTO, Promise<AnswerModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateAnswerDTO): Promise<AnswerModel> {
    return await this.commandBus.execute(new UpdateAnswerCommand(data));
  }
}
