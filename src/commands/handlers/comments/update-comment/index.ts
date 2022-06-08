import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentCommand } from '@/commands/implements/comments/update-comment.command';
import {
  CommentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCommentByIdRepository } from '@/repositories/comments/find-comment-by-id';
import { UpdateCommentRepository } from '@/repositories/comments/update-comment';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateCommentCommandKeys = keyof UpdateCommentCommand;

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentCommandHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  constructor(
    private readonly findCommentByIdRepository: FindCommentByIdRepository,
    private readonly updateCommentRepository: UpdateCommentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCommentCommand) {
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

    const updated = await this.updateCommentRepository.execute({
      ...data,
      where: {
        ...data.where,
        commentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const commentUpdated = await this.findCommentByIdRepository.execute(
      commentId
    );
    if (!commentUpdated) {
      throw new CommentNotFoundException();
    }
    const commentModel = this.publisher.mergeObjectContext(commentUpdated);
    commentModel.updatedComment();
    commentModel.commit();

    return commentUpdated;
  }

  private clearData(command: UpdateCommentCommand): UpdateCommentCommand {
    return cleanObject({
      where: cleanObject({
        commentId: cleanValue(command?.where?.commentId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
