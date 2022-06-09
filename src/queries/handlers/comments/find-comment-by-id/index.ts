import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CommentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CommentModel } from '@/models/comment.model';
import { FindCommentByIdQuery } from '@/queries/implements/comments/find-comment-by-id.query';
import { FindCommentByIdRepository } from '@/repositories/comments/find-comment-by-id';

@QueryHandler(FindCommentByIdQuery)
export class FindCommentByIdQueryHandler
  implements IQueryHandler<FindCommentByIdQuery>
{
  constructor(
    private readonly findCommentByIdRepository: FindCommentByIdRepository
  ) {}

  async execute(query: FindCommentByIdQuery): Promise<CommentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const comment = await this.findCommentByIdRepository.execute(id);
    if (!comment) {
      throw new CommentNotFoundException();
    }
    return comment;
  }
}
