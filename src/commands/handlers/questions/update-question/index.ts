import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateQuestionCommand } from '@/commands/implements/questions/update-question.command';
import {
  QuestionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindQuestionByIdRepository } from '@/repositories/questions/find-question-by-id';
import { UpdateQuestionRepository } from '@/repositories/questions/update-question';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateQuestionCommandKeys = keyof UpdateQuestionCommand;

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionCommandHandler
  implements ICommandHandler<UpdateQuestionCommand>
{
  constructor(
    private readonly findQuestionByIdRepository: FindQuestionByIdRepository,
    private readonly updateQuestionRepository: UpdateQuestionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateQuestionCommand) {
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

    const updated = await this.updateQuestionRepository.execute({
      ...data,
      where: {
        ...data.where,
        questionId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const questionUpdated = await this.findQuestionByIdRepository.execute(
      questionId
    );
    if (!questionUpdated) {
      throw new QuestionNotFoundException();
    }
    const questionModel = this.publisher.mergeObjectContext(questionUpdated);
    questionModel.updatedQuestion();
    questionModel.commit();

    return questionUpdated;
  }

  private clearData(command: UpdateQuestionCommand): UpdateQuestionCommand {
    return cleanObject({
      where: cleanObject({
        questionId: cleanValue(command?.where?.questionId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
