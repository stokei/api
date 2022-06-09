import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AnswerCreatedEvent } from '@/events/implements/answers/answer-created.event';

@EventsHandler(AnswerCreatedEvent)
export class AnswerCreatedHandler implements IEventHandler<AnswerCreatedEvent> {
  async handle(event: AnswerCreatedEvent) {
    const { answer } = event;
    Logger.log(`#${answer.id} - created!`, AnswerCreatedHandler.name);
    return event;
  }
}
