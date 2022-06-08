import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCommentCommand } from '@/commands/implements/comments/remove-comment.command';
import {
  CommentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCommentByIdRepository } from '@/repositories/comments/find-comment-by-id';
import { RemoveCommentRepository } from '@/repositories/comments/remove-comment';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveCommentCommandKeys = keyof RemoveCommentCommand;

@CommandHandler(RemoveCommentCommand)
export class RemoveCommentCommandHandler
  implements ICommandHandler<RemoveCommentCommand>
{
  constructor(
    private readonly findCommentByIdRepository: FindCommentByIdRepository,
    private readonly removeCommentRepository: RemoveCommentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCommentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const commentId = splitServiceId(data.where?.commentId)?.id;
    if (!commentId) {
      throw new ParamNotFoundException('commentId');
    }

    const comment = await this.findCommentByIdRepository.execute(commentId);
    if (!comment) {
      throw new CommentNotFoundException();
    }

    const removed = await this.removeCommentRepository.execute({
      where: {
        commentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const commentModel = this.publisher.mergeObjectContext(comment);
    commentModel.removedComment();
    commentModel.commit();

    return comment;
  }

  private clearData(command: RemoveCommentCommand): RemoveCommentCommand {
    return cleanObject({
      where: cleanObject({
        commentId: cleanValue(command?.where?.commentId)
      })
    });
  }
}
