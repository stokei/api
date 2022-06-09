import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAnswerCommand } from '@/commands/implements/answers/create-answer.command';
import {
  AnswerNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAnswerRepository } from '@/repositories/answers/create-answer';

type CreateAnswerCommandKeys = keyof CreateAnswerCommand;

@CommandHandler(CreateAnswerCommand)
export class CreateAnswerCommandHandler
  implements ICommandHandler<CreateAnswerCommand>
{
  constructor(
    private readonly createAnswerRepository: CreateAnswerRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAnswerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateAnswerCommandKeys>('parent');
    }

    const answerCreated = await this.createAnswerRepository.execute(data);
    if (!answerCreated) {
      throw new AnswerNotFoundException();
    }
    const answerModel = this.publisher.mergeObjectContext(answerCreated);
    answerModel.createdAnswer();
    answerModel.commit();

    return answerCreated;
  }

  private clearData(command: CreateAnswerCommand): CreateAnswerCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
