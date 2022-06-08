import { CommentModel } from '@/models/comment.model';

interface IDataCommentUpdatedEvent {
  readonly comment: CommentModel;
}

export class CommentUpdatedEvent {
  readonly comment: CommentModel;

  constructor(data: IDataCommentUpdatedEvent) {
    this.comment = data.comment;
  }
}
