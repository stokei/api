import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesInstructorRemovedEvent } from '@/events/implements/courses-instructors/courses-instructor-removed.event';

@EventsHandler(CoursesInstructorRemovedEvent)
export class CoursesInstructorRemovedHandler
  implements IEventHandler<CoursesInstructorRemovedEvent>
{
  async handle(event: CoursesInstructorRemovedEvent) {
    const { coursesInstructor } = event;
    Logger.log(
      `#${coursesInstructor.id} - removed!`,
      CoursesInstructorRemovedHandler.name
    );
    return event;
  }
}
