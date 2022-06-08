import { CommentRemovedEvent } from '@/events/implements/comments/comment-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CommentRemovedEvent)
export class CommentRemovedHandler
  implements IEventHandler<CommentRemovedEvent>
{
  async handle(event: CommentRemovedEvent) {
    const { comment } = event;
    Logger.log(`#${comment.id} - removed!`, CommentRemovedHandler.name);
    return event;
  }
}
