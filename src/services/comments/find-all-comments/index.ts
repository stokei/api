import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCommentsDTO } from '@/dtos/comments/find-all-comments.dto';
import { CommentModel } from '@/models/comment.model';
import { FindAllCommentsQuery } from '@/queries/implements/comments/find-all-comments.query';

@Injectable()
export class FindAllCommentsService
  implements
    IBaseService<FindAllCommentsDTO, Promise<IPaginatedType<CommentModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCommentsDTO
  ): Promise<IPaginatedType<CommentModel>> {
    return await this.queryBus.execute(new FindAllCommentsQuery(data));
  }
}
