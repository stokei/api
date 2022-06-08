import { ClassroomRemovedEvent } from '@/events/implements/classrooms/classroom-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
