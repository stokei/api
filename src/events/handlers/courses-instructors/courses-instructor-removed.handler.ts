import { CoursesInstructorRemovedEvent } from '@/events/implements/courses-instructors/courses-instructor-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
