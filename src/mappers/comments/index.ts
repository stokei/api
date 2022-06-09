import { convertToISODateString } from '@stokei/nestjs';

import { CommentEntity } from '@/entities';
import { CommentModel } from '@/models/comment.model';

export class CommentMapper {
  toModel(comment: CommentEntity) {
    return (
      comment &&
      new CommentModel({
        ...comment,
        updatedAt: convertToISODateString(comment.updatedAt),
        createdAt: convertToISODateString(comment.createdAt)
      })
    );
  }
  toModels(comments: CommentEntity[]) {
    return comments?.length > 0
      ? comments.map(this.toModel).filter(Boolean)
      : [];
  }
}
