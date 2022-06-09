import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsMaterialCreatedEvent } from '@/events/implements/classrooms-materials/classrooms-material-created.event';

@EventsHandler(ClassroomsMaterialCreatedEvent)
export class ClassroomsMaterialCreatedHandler
  implements IEventHandler<ClassroomsMaterialCreatedEvent>
{
  async handle(event: ClassroomsMaterialCreatedEvent) {
    const { classroomsMaterial } = event;
    Logger.log(
      `#${classroomsMaterial.id} - created!`,
      ClassroomsMaterialCreatedHandler.name
    );
    return event;
  }
}
