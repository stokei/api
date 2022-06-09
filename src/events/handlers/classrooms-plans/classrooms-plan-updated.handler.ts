import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsPlanUpdatedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-updated.event';

@EventsHandler(ClassroomsPlanUpdatedEvent)
export class ClassroomsPlanUpdatedHandler
  implements IEventHandler<ClassroomsPlanUpdatedEvent>
{
  async handle(event: ClassroomsPlanUpdatedEvent) {
    const { classroomsPlan } = event;
    Logger.log(
      `#${classroomsPlan.id} - updated!`,
      ClassroomsPlanUpdatedHandler.name
    );
    return event;
  }
}
