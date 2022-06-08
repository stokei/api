import { AnswerUpdatedEvent } from '@/events/implements/answers/answer-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AnswerUpdatedEvent)
export class AnswerUpdatedHandler implements IEventHandler<AnswerUpdatedEvent> {
  async handle(event: AnswerUpdatedEvent) {
    const { answer } = event;
    Logger.log(`#${answer.id} - updated!`, AnswerUpdatedHandler.name);
    return event;
  }
}
