import { ClassroomsTagRemovedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsTagRemovedEvent)
export class ClassroomsTagRemovedHandler
  implements IEventHandler<ClassroomsTagRemovedEvent>
{
  async handle(event: ClassroomsTagRemovedEvent) {
    const { classroomsTag } = event;
    Logger.log(
      `#${classroomsTag.id} - removed!`,
      ClassroomsTagRemovedHandler.name
    );
    return event;
  }
}
