import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomModuleCreatedEvent } from '@/events/implements/classroom-module s/classroom-module -created.event';

@EventsHandler(ClassroomModuleCreatedEvent)
export class ClassroomModuleCreatedHandler
  implements IEventHandler<ClassroomModuleCreatedEvent>
{
  async handle(event: ClassroomModuleCreatedEvent) {
    const { classroomModule } = event;
    Logger.log(
      `#${classroomModule.id} - created!`,
      ClassroomModuleCreatedHandler.name
    );
    return event;
  }
}
