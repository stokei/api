import { ClassroomsModuleRemovedEvent } from '@/events/implements/classrooms-modules/classrooms-module-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsModuleRemovedEvent)
export class ClassroomsModuleRemovedHandler
  implements IEventHandler<ClassroomsModuleRemovedEvent>
{
  async handle(event: ClassroomsModuleRemovedEvent) {
    const { classroomsModule } = event;
    Logger.log(
      `#${classroomsModule.id} - removed!`,
      ClassroomsModuleRemovedHandler.name
    );
    return event;
  }
}
