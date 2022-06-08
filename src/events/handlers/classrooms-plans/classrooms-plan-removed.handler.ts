import { ClassroomsPlanRemovedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
