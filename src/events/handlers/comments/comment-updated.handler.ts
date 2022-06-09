import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CommentUpdatedEvent } from '@/events/implements/comments/comment-updated.event';

@EventsHandler(CommentUpdatedEvent)
export class CommentUpdatedHandler
  implements IEventHandler<CommentUpdatedEvent>
{
  async handle(event: CommentUpdatedEvent) {
    const { comment } = event;
    Logger.log(`#${comment.id} - updated!`, CommentUpdatedHandler.name);
    return event;
  }
}
