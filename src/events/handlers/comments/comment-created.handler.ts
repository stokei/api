import { CommentCreatedEvent } from '@/events/implements/comments/comment-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CommentCreatedEvent)
export class CommentCreatedHandler
  implements IEventHandler<CommentCreatedEvent>
{
  async handle(event: CommentCreatedEvent) {
    const { comment } = event;
    Logger.log(`#${comment.id} - created!`, CommentCreatedHandler.name);
    return event;
  }
}
