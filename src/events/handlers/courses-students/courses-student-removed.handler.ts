import { CoursesStudentRemovedEvent } from '@/events/implements/courses-students/courses-student-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CoursesStudentRemovedEvent)
export class CoursesStudentRemovedHandler
  implements IEventHandler<CoursesStudentRemovedEvent>
{
  async handle(event: CoursesStudentRemovedEvent) {
    const { coursesStudent } = event;
    Logger.log(
      `#${coursesStudent.id} - removed!`,
      CoursesStudentRemovedHandler.name
    );
    return event;
  }
}
