import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveAnswerCommand } from '@/commands/implements/answers/remove-answer.command';
import { RemoveAnswerDTO } from '@/dtos/answers/remove-answer.dto';
import { AnswerModel } from '@/models/answer.model';

@Injectable()
export class RemoveAnswerService
  implements IBaseService<RemoveAnswerDTO, Promise<AnswerModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveAnswerDTO): Promise<AnswerModel> {
    return await this.commandBus.execute(new RemoveAnswerCommand(data));
  }
}
