import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomUpdatedEvent } from '@/events/implements/classrooms/classroom-updated.event';

@EventsHandler(ClassroomUpdatedEvent)
export class ClassroomUpdatedHandler
  implements IEventHandler<ClassroomUpdatedEvent>
{
  async handle(event: ClassroomUpdatedEvent) {
    const { classroom } = event;
    Logger.log(`#${classroom.id} - updated!`, ClassroomUpdatedHandler.name);
    return event;
  }
}
