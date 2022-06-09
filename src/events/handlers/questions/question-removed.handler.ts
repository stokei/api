import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { QuestionRemovedEvent } from '@/events/implements/questions/question-removed.event';

@EventsHandler(QuestionRemovedEvent)
export class QuestionRemovedHandler
  implements IEventHandler<QuestionRemovedEvent>
{
  async handle(event: QuestionRemovedEvent) {
    const { question } = event;
    Logger.log(`#${question.id} - removed!`, QuestionRemovedHandler.name);
    return event;
  }
}
