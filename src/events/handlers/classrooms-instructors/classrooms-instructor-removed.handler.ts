import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsInstructorRemovedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-removed.event';

@EventsHandler(ClassroomsInstructorRemovedEvent)
export class ClassroomsInstructorRemovedHandler
  implements IEventHandler<ClassroomsInstructorRemovedEvent>
{
  async handle(event: ClassroomsInstructorRemovedEvent) {
    const { classroomsInstructor } = event;
    Logger.log(
      `#${classroomsInstructor.id} - removed!`,
      ClassroomsInstructorRemovedHandler.name
    );
    return event;
  }
}
