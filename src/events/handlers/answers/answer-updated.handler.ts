import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AnswerUpdatedEvent } from '@/events/implements/answers/answer-updated.event';

@EventsHandler(AnswerUpdatedEvent)
export class AnswerUpdatedHandler implements IEventHandler<AnswerUpdatedEvent> {
  async handle(event: AnswerUpdatedEvent) {
    const { answer } = event;
    Logger.log(`#${answer.id} - updated!`, AnswerUpdatedHandler.name);
    return event;
  }
}
