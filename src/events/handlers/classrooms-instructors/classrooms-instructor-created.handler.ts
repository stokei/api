import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsInstructorCreatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-created.event';

@EventsHandler(ClassroomsInstructorCreatedEvent)
export class ClassroomsInstructorCreatedHandler
  implements IEventHandler<ClassroomsInstructorCreatedEvent>
{
  async handle(event: ClassroomsInstructorCreatedEvent) {
    const { classroomsInstructor } = event;
    Logger.log(
      `#${classroomsInstructor.id} - created!`,
      ClassroomsInstructorCreatedHandler.name
    );
    return event;
  }
}
