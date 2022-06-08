import { UpdateCommentCommand } from '@/commands/implements/comments/update-comment.command';
import { UpdateCommentDTO } from '@/dtos/comments/update-comment.dto';
import { CommentModel } from '@/models/comment.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateCommentService
  implements IBaseService<UpdateCommentDTO, Promise<CommentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCommentDTO): Promise<CommentModel> {
    return await this.commandBus.execute(new UpdateCommentCommand(data));
  }
}
