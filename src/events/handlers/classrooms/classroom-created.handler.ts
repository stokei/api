import { ClassroomCreatedEvent } from '@/events/implements/classrooms/classroom-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
