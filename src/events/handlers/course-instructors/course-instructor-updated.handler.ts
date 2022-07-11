import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseInstructorUpdatedEvent } from '@/events/implements/course-instructors/course-instructor-updated.event';

@EventsHandler(CourseInstructorUpdatedEvent)
export class CourseInstructorUpdatedHandler
  implements IEventHandler<CourseInstructorUpdatedEvent>
{
  async handle(event: CourseInstructorUpdatedEvent) {
    const { courseInstructor } = event;
    Logger.log(
      `#${courseInstructor.id} - updated!`,
      CourseInstructorUpdatedHandler.name
    );
    return event;
  }
}
