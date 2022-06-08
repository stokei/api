import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAnswerCommand } from '@/commands/implements/answers/update-answer.command';
import {
  AnswerNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAnswerByIdRepository } from '@/repositories/answers/find-answer-by-id';
import { UpdateAnswerRepository } from '@/repositories/answers/update-answer';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateAnswerCommandKeys = keyof UpdateAnswerCommand;

@CommandHandler(UpdateAnswerCommand)
export class UpdateAnswerCommandHandler
  implements ICommandHandler<UpdateAnswerCommand>
{
  constructor(
    private readonly findAnswerByIdRepository: FindAnswerByIdRepository,
    private readonly updateAnswerRepository: UpdateAnswerRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateAnswerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const answerId = splitServiceId(data.where?.answerId)?.id;
    if (!answerId) {
      throw new ParamNotFoundException('answerId');
    }

    const answer = await this.findAnswerByIdRepository.execute(answerId);
    if (!answer) {
      throw new AnswerNotFoundException();
    }

    const updated = await this.updateAnswerRepository.execute({
      ...data,
      where: {
        ...data.where,
        answerId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const answerUpdated = await this.findAnswerByIdRepository.execute(answerId);
    if (!answerUpdated) {
      throw new AnswerNotFoundException();
    }
    const answerModel = this.publisher.mergeObjectContext(answerUpdated);
    answerModel.updatedAnswer();
    answerModel.commit();

    return answerUpdated;
  }

  private clearData(command: UpdateAnswerCommand): UpdateAnswerCommand {
    return cleanObject({
      where: cleanObject({
        answerId: cleanValue(command?.where?.answerId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
