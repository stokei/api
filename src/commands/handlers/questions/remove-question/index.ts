import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveQuestionCommand } from '@/commands/implements/questions/remove-question.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  QuestionNotFoundException
} from '@/errors';
import { FindQuestionByIdRepository } from '@/repositories/questions/find-question-by-id';
import { RemoveQuestionRepository } from '@/repositories/questions/remove-question';

type RemoveQuestionCommandKeys = keyof RemoveQuestionCommand;

@CommandHandler(RemoveQuestionCommand)
export class RemoveQuestionCommandHandler
  implements ICommandHandler<RemoveQuestionCommand>
{
  constructor(
    private readonly findQuestionByIdRepository: FindQuestionByIdRepository,
    private readonly removeQuestionRepository: RemoveQuestionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveQuestionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const questionId = splitServiceId(data.where?.questionId)?.id;
    if (!questionId) {
      throw new ParamNotFoundException('questionId');
    }

    const question = await this.findQuestionByIdRepository.execute(questionId);
    if (!question) {
      throw new QuestionNotFoundException();
    }

    const removed = await this.removeQuestionRepository.execute({
      where: {
        questionId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const questionModel = this.publisher.mergeObjectContext(question);
    questionModel.removedQuestion();
    questionModel.commit();

    return question;
  }

  private clearData(command: RemoveQuestionCommand): RemoveQuestionCommand {
    return cleanObject({
      where: cleanObject({
        questionId: cleanValue(command?.where?.questionId)
      })
    });
  }
}
