import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomStudentCreatedEvent } from '@/events/implements/classroom-students/classroom-student-created.event';

@EventsHandler(ClassroomStudentCreatedEvent)
export class ClassroomStudentCreatedHandler
  implements IEventHandler<ClassroomStudentCreatedEvent>
{
  async handle(event: ClassroomStudentCreatedEvent) {
    const { classroomStudent } = event;
    Logger.log(
      `#${classroomStudent.id} - created!`,
      ClassroomStudentCreatedHandler.student
    );
    return event;
  }
}
