import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsMaterialUpdatedEvent } from '@/events/implements/classrooms-materials/classrooms-material-updated.event';

@EventsHandler(ClassroomsMaterialUpdatedEvent)
export class ClassroomsMaterialUpdatedHandler
  implements IEventHandler<ClassroomsMaterialUpdatedEvent>
{
  async handle(event: ClassroomsMaterialUpdatedEvent) {
    const { classroomsMaterial } = event;
    Logger.log(
      `#${classroomsMaterial.id} - updated!`,
      ClassroomsMaterialUpdatedHandler.name
    );
    return event;
  }
}
