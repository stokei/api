import { ClassroomsTagUpdatedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsTagUpdatedEvent)
export class ClassroomsTagUpdatedHandler
  implements IEventHandler<ClassroomsTagUpdatedEvent>
{
  async handle(event: ClassroomsTagUpdatedEvent) {
    const { classroomsTag } = event;
    Logger.log(
      `#${classroomsTag.id} - updated!`,
      ClassroomsTagUpdatedHandler.name
    );
    return event;
  }
}
