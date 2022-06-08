import { ClassroomUpdatedEvent } from '@/events/implements/classrooms/classroom-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
