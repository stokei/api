import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CommentCreatedEvent } from '@/events/implements/comments/comment-created.event';
import { CommentUpdatedEvent } from '@/events/implements/comments/comment-updated.event';
import { CommentRemovedEvent } from '@/events/implements/comments/comment-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface ICommentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CommentModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICommentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COMMENTS,
      module: ServerStokeiApiIdPrefix.COMMENTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdComment() {
    if (this.id) {
      this.apply(
        new CommentCreatedEvent({
          comment: this
        })
      );
    }
  }

  updatedComment() {
    if (this.id) {
      this.apply(
        new CommentUpdatedEvent({
          comment: this
        })
      );
    }
  }

  removedComment() {
    if (this.id) {
      this.apply(
        new CommentRemovedEvent({
          comment: this
        })
      );
    }
  }
}
