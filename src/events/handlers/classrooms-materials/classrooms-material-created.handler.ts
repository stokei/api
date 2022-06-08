import { ClassroomsMaterialCreatedEvent } from '@/events/implements/classrooms-materials/classrooms-material-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
