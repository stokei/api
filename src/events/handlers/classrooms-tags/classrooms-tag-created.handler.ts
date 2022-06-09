import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsTagCreatedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-created.event';

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
