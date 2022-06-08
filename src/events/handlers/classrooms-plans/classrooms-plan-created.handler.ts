import { ClassroomsPlanCreatedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
