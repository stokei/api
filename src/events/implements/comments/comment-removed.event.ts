import { CommentModel } from '@/models/comment.model';

interface IDataCommentRemovedEvent {
  readonly comment: CommentModel;
}

export class CommentRemovedEvent {
  readonly comment: CommentModel;

  constructor(data: IDataCommentRemovedEvent) {
    this.comment = data.comment;
  }
}
