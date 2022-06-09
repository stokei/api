import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateQuestionCommand } from '@/commands/implements/questions/update-question.command';
import { UpdateQuestionDTO } from '@/dtos/questions/update-question.dto';
import { QuestionModel } from '@/models/question.model';

@Injectable()
export class UpdateQuestionService
  implements IBaseService<UpdateQuestionDTO, Promise<QuestionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateQuestionDTO): Promise<QuestionModel> {
    return await this.commandBus.execute(new UpdateQuestionCommand(data));
  }
}
