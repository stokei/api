import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { QuestionUpdatedEvent } from '@/events/implements/questions/question-updated.event';

@EventsHandler(QuestionUpdatedEvent)
export class QuestionUpdatedHandler
  implements IEventHandler<QuestionUpdatedEvent>
{
  async handle(event: QuestionUpdatedEvent) {
    const { question } = event;
    Logger.log(`#${question.id} - updated!`, QuestionUpdatedHandler.name);
    return event;
  }
}
