import { QuestionRemovedEvent } from '@/events/implements/questions/question-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
