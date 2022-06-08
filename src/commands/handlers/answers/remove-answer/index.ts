import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveAnswerCommand } from '@/commands/implements/answers/remove-answer.command';
import {
  AnswerNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAnswerByIdRepository } from '@/repositories/answers/find-answer-by-id';
import { RemoveAnswerRepository } from '@/repositories/answers/remove-answer';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveAnswerCommandKeys = keyof RemoveAnswerCommand;

@CommandHandler(RemoveAnswerCommand)
export class RemoveAnswerCommandHandler
  implements ICommandHandler<RemoveAnswerCommand>
{
  constructor(
    private readonly findAnswerByIdRepository: FindAnswerByIdRepository,
    private readonly removeAnswerRepository: RemoveAnswerRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAnswerCommand) {
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

    const removed = await this.removeAnswerRepository.execute({
      where: {
        answerId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const answerModel = this.publisher.mergeObjectContext(answer);
    answerModel.removedAnswer();
    answerModel.commit();

    return answer;
  }

  private clearData(command: RemoveAnswerCommand): RemoveAnswerCommand {
    return cleanObject({
      where: cleanObject({
        answerId: cleanValue(command?.where?.answerId)
      })
    });
  }
}
