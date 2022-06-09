import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesInstructorUpdatedEvent } from '@/events/implements/courses-instructors/courses-instructor-updated.event';

@EventsHandler(CoursesInstructorUpdatedEvent)
export class CoursesInstructorUpdatedHandler
  implements IEventHandler<CoursesInstructorUpdatedEvent>
{
  async handle(event: CoursesInstructorUpdatedEvent) {
    const { coursesInstructor } = event;
    Logger.log(
      `#${coursesInstructor.id} - updated!`,
      CoursesInstructorUpdatedHandler.name
    );
    return event;
  }
}
