import { QuestionCreatedEvent } from '@/events/implements/questions/question-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(QuestionCreatedEvent)
export class QuestionCreatedHandler
  implements IEventHandler<QuestionCreatedEvent>
{
  async handle(event: QuestionCreatedEvent) {
    const { question } = event;
    Logger.log(`#${question.id} - created!`, QuestionCreatedHandler.name);
    return event;
  }
}
