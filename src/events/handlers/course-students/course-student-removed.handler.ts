import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseStudentRemovedEvent } from '@/events/implements/course-students/course-student-removed.event';

@EventsHandler(CourseStudentRemovedEvent)
export class CourseStudentRemovedHandler
  implements IEventHandler<CourseStudentRemovedEvent>
{
  async handle(event: CourseStudentRemovedEvent) {
    const { courseStudent } = event;
    Logger.log(
      `#${courseStudent.id} - removed!`,
      CourseStudentRemovedHandler.name
    );
    return event;
  }
}
