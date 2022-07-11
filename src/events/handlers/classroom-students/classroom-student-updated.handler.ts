import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomStudentUpdatedEvent } from '@/events/implements/classroom-students/classroom-student-updated.event';

@EventsHandler(ClassroomStudentUpdatedEvent)
export class ClassroomStudentUpdatedHandler
  implements IEventHandler<ClassroomStudentUpdatedEvent>
{
  async handle(event: ClassroomStudentUpdatedEvent) {
    const { classroomStudent } = event;
    Logger.log(
      `#${classroomStudent.id} - updated!`,
      ClassroomStudentUpdatedHandler.name
    );
    return event;
  }
}
