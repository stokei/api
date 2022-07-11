import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseInstructorCreatedEvent } from '@/events/implements/course-instructors/course-instructor-created.event';

@EventsHandler(CourseInstructorCreatedEvent)
export class CourseInstructorCreatedHandler
  implements IEventHandler<CourseInstructorCreatedEvent>
{
  async handle(event: CourseInstructorCreatedEvent) {
    const { courseInstructor } = event;
    Logger.log(
      `#${courseInstructor.id} - created!`,
      CourseInstructorCreatedHandler.name
    );
    return event;
  }
}
