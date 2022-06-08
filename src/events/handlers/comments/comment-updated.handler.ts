import { CommentUpdatedEvent } from '@/events/implements/comments/comment-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
