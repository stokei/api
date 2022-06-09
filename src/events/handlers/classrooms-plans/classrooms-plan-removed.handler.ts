import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsPlanRemovedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-removed.event';

@EventsHandler(ClassroomsPlanRemovedEvent)
export class ClassroomsPlanRemovedHandler
  implements IEventHandler<ClassroomsPlanRemovedEvent>
{
  async handle(event: ClassroomsPlanRemovedEvent) {
    const { classroomsPlan } = event;
    Logger.log(
      `#${classroomsPlan.id} - removed!`,
      ClassroomsPlanRemovedHandler.name
    );
    return event;
  }
}
