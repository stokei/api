import { ClassroomsMaterialRemovedEvent } from '@/events/implements/classrooms-materials/classrooms-material-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsMaterialRemovedEvent)
export class ClassroomsMaterialRemovedHandler
  implements IEventHandler<ClassroomsMaterialRemovedEvent>
{
  async handle(event: ClassroomsMaterialRemovedEvent) {
    const { classroomsMaterial } = event;
    Logger.log(
      `#${classroomsMaterial.id} - removed!`,
      ClassroomsMaterialRemovedHandler.name
    );
    return event;
  }
}
