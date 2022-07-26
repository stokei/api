import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomInstructorRemovedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-removed.event';

@EventsHandler(ClassroomInstructorRemovedEvent)
export class ClassroomInstructorRemovedHandler
  implements IEventHandler<ClassroomInstructorRemovedEvent>
{
  async handle(event: ClassroomInstructorRemovedEvent) {
    const { classroomInstructor } = event;
    Logger.log(
      `#${classroomInstructor.id} - removed!`,
      ClassroomInstructorRemovedHandler.name
    );
    return event;
  }
}
