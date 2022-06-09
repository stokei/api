import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsModuleRemovedEvent } from '@/events/implements/classrooms-modules/classrooms-module-removed.event';

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
