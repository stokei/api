import { CreateQuestionCommand } from '@/commands/implements/questions/create-question.command';
import { CreateQuestionDTO } from '@/dtos/questions/create-question.dto';
import { QuestionModel } from '@/models/question.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateQuestionService
  implements IBaseService<CreateQuestionDTO, Promise<QuestionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateQuestionDTO): Promise<QuestionModel> {
    return await this.commandBus.execute(new CreateQuestionCommand(data));
  }
}
