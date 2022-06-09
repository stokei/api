import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomRemovedEvent } from '@/events/implements/classrooms/classroom-removed.event';

@EventsHandler(ClassroomRemovedEvent)
export class ClassroomRemovedHandler
  implements IEventHandler<ClassroomRemovedEvent>
{
  async handle(event: ClassroomRemovedEvent) {
    const { classroom } = event;
    Logger.log(`#${classroom.id} - removed!`, ClassroomRemovedHandler.name);
    return event;
  }
}
