import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomInstructorCreatedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-created.event';

@EventsHandler(ClassroomInstructorCreatedEvent)
export class ClassroomInstructorCreatedHandler
  implements IEventHandler<ClassroomInstructorCreatedEvent>
{
  async handle(event: ClassroomInstructorCreatedEvent) {
    const { classroomInstructor } = event;
    Logger.log(
      `#${classroomInstructor.id} - created!`,
      ClassroomInstructorCreatedHandler.name
    );
    return event;
  }
}
