import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomCreatedEvent } from '@/events/implements/classrooms/classroom-created.event';

@EventsHandler(ClassroomCreatedEvent)
export class ClassroomCreatedHandler
  implements IEventHandler<ClassroomCreatedEvent>
{
  async handle(event: ClassroomCreatedEvent) {
    const { classroom } = event;
    Logger.log(`#${classroom.id} - created!`, ClassroomCreatedHandler.name);
    return event;
  }
}
