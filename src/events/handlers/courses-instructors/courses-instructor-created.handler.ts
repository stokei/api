import { CoursesInstructorCreatedEvent } from '@/events/implements/courses-instructors/courses-instructor-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CoursesInstructorCreatedEvent)
export class CoursesInstructorCreatedHandler
  implements IEventHandler<CoursesInstructorCreatedEvent>
{
  async handle(event: CoursesInstructorCreatedEvent) {
    const { coursesInstructor } = event;
    Logger.log(
      `#${coursesInstructor.id} - created!`,
      CoursesInstructorCreatedHandler.name
    );
    return event;
  }
}
