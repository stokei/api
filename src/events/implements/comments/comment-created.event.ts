import { CommentModel } from '@/models/comment.model';

interface IDataCommentCreatedEvent {
  readonly comment: CommentModel;
}

export class CommentCreatedEvent {
  readonly comment: CommentModel;

  constructor(data: IDataCommentCreatedEvent) {
    this.comment = data.comment;
  }
}
