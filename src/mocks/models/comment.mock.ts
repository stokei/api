import { CommentModel, ICommentModelData } from '@/models/comment.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class CommentModelMock extends CommentModel {
  constructor(data?: Partial<ICommentModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Comment Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
