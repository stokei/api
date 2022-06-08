import { QuestionUpdatedEvent } from '@/events/implements/questions/question-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
