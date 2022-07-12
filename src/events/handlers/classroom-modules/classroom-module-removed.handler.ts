import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomModuleRemovedEvent } from '@/events/implements/classroom-modules/classroom-module-removed.event';

@EventsHandler(ClassroomModuleRemovedEvent)
export class ClassroomModuleRemovedHandler
  implements IEventHandler<ClassroomModuleRemovedEvent>
{
  async handle(event: ClassroomModuleRemovedEvent) {
    const { classroomModule } = event;
    Logger.log(
      `#${classroomModule.id} - removed!`,
      ClassroomModuleRemovedHandler.name
    );
    return event;
  }
}
