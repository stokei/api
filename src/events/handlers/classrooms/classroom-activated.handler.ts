import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomActivatedEvent } from '@/events/implements/classrooms/classroom-activated.event';

@EventsHandler(ClassroomActivatedEvent)
export class ClassroomActivatedHandler
  implements IEventHandler<ClassroomActivatedEvent>
{
  async handle(event: ClassroomActivatedEvent) {
    const { classroom } = event;
    Logger.log(`#${classroom.id} - activated!`, ClassroomActivatedHandler.name);
    return event;
  }
}
