import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomStudentRemovedEvent } from '@/events/implements/classroom-students/classroom-student-removed.event';

@EventsHandler(ClassroomStudentRemovedEvent)
export class ClassroomStudentRemovedHandler
  implements IEventHandler<ClassroomStudentRemovedEvent>
{
  async handle(event: ClassroomStudentRemovedEvent) {
    const { classroomStudent } = event;
    Logger.log(
      `#${classroomStudent.id} - removed!`,
      ClassroomStudentRemovedHandler.name
    );
    return event;
  }
}
