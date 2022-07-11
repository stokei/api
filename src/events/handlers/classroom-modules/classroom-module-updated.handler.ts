import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomModuleUpdatedEvent } from '@/events/implements/classroom-module s/classroom-module -updated.event';

@EventsHandler(ClassroomModuleUpdatedEvent)
export class ClassroomModuleUpdatedHandler
  implements IEventHandler<ClassroomModuleUpdatedEvent>
{
  async handle(event: ClassroomModuleUpdatedEvent) {
    const { classroomModule } = event;
    Logger.log(
      `#${classroomModule.id} - updated!`,
      ClassroomModuleUpdatedHandler.name
    );
    return event;
  }
}
