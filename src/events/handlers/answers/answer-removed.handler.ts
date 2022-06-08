import { AnswerRemovedEvent } from '@/events/implements/answers/answer-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AnswerRemovedEvent)
export class AnswerRemovedHandler implements IEventHandler<AnswerRemovedEvent> {
  async handle(event: AnswerRemovedEvent) {
    const { answer } = event;
    Logger.log(`#${answer.id} - removed!`, AnswerRemovedHandler.name);
    return event;
  }
}
