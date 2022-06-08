import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { CommentModel } from '@/models/comment.model';
import { FindCommentByIdQuery } from '@/queries/implements/comments/find-comment-by-id.query';

@Injectable()
export class FindCommentByIdService
  implements IBaseService<string, Promise<CommentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CommentModel> {
    return await this.queryBus.execute(new FindCommentByIdQuery(data));
  }
}
