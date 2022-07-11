import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseInstructorRemovedEvent } from '@/events/implements/course-instructors/course-instructor-removed.event';

@EventsHandler(CourseInstructorRemovedEvent)
export class CourseInstructorRemovedHandler
  implements IEventHandler<CourseInstructorRemovedEvent>
{
  async handle(event: CourseInstructorRemovedEvent) {
    const { courseInstructor } = event;
    Logger.log(
      `#${courseInstructor.id} - removed!`,
      CourseInstructorRemovedHandler.name
    );
    return event;
  }
}
