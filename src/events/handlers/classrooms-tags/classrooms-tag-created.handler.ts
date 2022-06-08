import { ClassroomsTagCreatedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsTagCreatedEvent)
export class ClassroomsTagCreatedHandler
  implements IEventHandler<ClassroomsTagCreatedEvent>
{
  async handle(event: ClassroomsTagCreatedEvent) {
    const { classroomsTag } = event;
    Logger.log(
      `#${classroomsTag.id} - created!`,
      ClassroomsTagCreatedHandler.name
    );
    return event;
  }
}
