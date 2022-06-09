import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCommentCommand } from '@/commands/implements/comments/create-comment.command';
import {
  CommentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCommentRepository } from '@/repositories/comments/create-comment';

type CreateCommentCommandKeys = keyof CreateCommentCommand;

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    private readonly createCommentRepository: CreateCommentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCommentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCommentCommandKeys>('parent');
    }

    const commentCreated = await this.createCommentRepository.execute(data);
    if (!commentCreated) {
      throw new CommentNotFoundException();
    }
    const commentModel = this.publisher.mergeObjectContext(commentCreated);
    commentModel.createdComment();
    commentModel.commit();

    return commentCreated;
  }

  private clearData(command: CreateCommentCommand): CreateCommentCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
