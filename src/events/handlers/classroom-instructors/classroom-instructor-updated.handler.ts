import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomInstructorUpdatedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-updated.event';

@EventsHandler(ClassroomInstructorUpdatedEvent)
export class ClassroomInstructorUpdatedHandler
  implements IEventHandler<ClassroomInstructorUpdatedEvent>
{
  async handle(event: ClassroomInstructorUpdatedEvent) {
    const { classroomInstructor } = event;
    Logger.log(
      `#${classroomInstructor.id} - updated!`,
      ClassroomInstructorUpdatedHandler.name
    );
    return event;
  }
}
