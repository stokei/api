import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AnswerRemovedEvent } from '@/events/implements/answers/answer-removed.event';

@EventsHandler(AnswerRemovedEvent)
export class AnswerRemovedHandler implements IEventHandler<AnswerRemovedEvent> {
  async handle(event: AnswerRemovedEvent) {
    const { answer } = event;
    Logger.log(`#${answer.id} - removed!`, AnswerRemovedHandler.name);
    return event;
  }
}
