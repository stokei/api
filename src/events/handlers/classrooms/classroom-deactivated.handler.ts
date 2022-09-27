import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomDeactivatedEvent } from '@/events/implements/classrooms/classroom-deactivated.event';

@EventsHandler(ClassroomDeactivatedEvent)
export class ClassroomDeactivatedHandler
  implements IEventHandler<ClassroomDeactivatedEvent>
{
  async handle(event: ClassroomDeactivatedEvent) {
    const { classroom } = event;
    Logger.log(
      `#${classroom.id} - deactivated!`,
      ClassroomDeactivatedHandler.name
    );
    return event;
  }
}
