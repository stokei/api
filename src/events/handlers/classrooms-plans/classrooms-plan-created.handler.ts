import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsPlanCreatedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-created.event';

@EventsHandler(ClassroomsPlanCreatedEvent)
export class ClassroomsPlanCreatedHandler
  implements IEventHandler<ClassroomsPlanCreatedEvent>
{
  async handle(event: ClassroomsPlanCreatedEvent) {
    const { classroomsPlan } = event;
    Logger.log(
      `#${classroomsPlan.id} - created!`,
      ClassroomsPlanCreatedHandler.name
    );
    return event;
  }
}
