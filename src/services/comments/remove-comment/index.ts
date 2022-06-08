import { RemoveCommentCommand } from '@/commands/implements/comments/remove-comment.command';
import { RemoveCommentDTO } from '@/dtos/comments/remove-comment.dto';
import { CommentModel } from '@/models/comment.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCommentService
  implements IBaseService<RemoveCommentDTO, Promise<CommentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCommentDTO): Promise<CommentModel> {
    return await this.commandBus.execute(new RemoveCommentCommand(data));
  }
}
