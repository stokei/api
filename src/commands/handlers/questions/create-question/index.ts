import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionCommand } from '@/commands/implements/questions/create-question.command';
import {
  QuestionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateQuestionRepository } from '@/repositories/questions/create-question';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateQuestionCommandKeys = keyof CreateQuestionCommand;

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionCommandHandler
  implements ICommandHandler<CreateQuestionCommand>
{
  constructor(
    private readonly createQuestionRepository: CreateQuestionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateQuestionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateQuestionCommandKeys>('parent');
    }

    const questionCreated = await this.createQuestionRepository.execute(data);
    if (!questionCreated) {
      throw new QuestionNotFoundException();
    }
    const questionModel = this.publisher.mergeObjectContext(questionCreated);
    questionModel.createdQuestion();
    questionModel.commit();

    return questionCreated;
  }

  private clearData(command: CreateQuestionCommand): CreateQuestionCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
