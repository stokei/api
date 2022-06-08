import { CreateCommentCommand } from '@/commands/implements/comments/create-comment.command';
import { CreateCommentDTO } from '@/dtos/comments/create-comment.dto';
import { CommentModel } from '@/models/comment.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateCommentService
  implements IBaseService<CreateCommentDTO, Promise<CommentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCommentDTO): Promise<CommentModel> {
    return await this.commandBus.execute(new CreateCommentCommand(data));
  }
}
