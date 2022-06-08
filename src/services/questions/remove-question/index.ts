import { RemoveQuestionCommand } from '@/commands/implements/questions/remove-question.command';
import { RemoveQuestionDTO } from '@/dtos/questions/remove-question.dto';
import { QuestionModel } from '@/models/question.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveQuestionService
  implements IBaseService<RemoveQuestionDTO, Promise<QuestionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveQuestionDTO): Promise<QuestionModel> {
    return await this.commandBus.execute(new RemoveQuestionCommand(data));
  }
}
