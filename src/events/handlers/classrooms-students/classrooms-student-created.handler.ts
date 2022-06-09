import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsStudentCreatedEvent } from '@/events/implements/classrooms-students/classrooms-student-created.event';

@EventsHandler(ClassroomsStudentCreatedEvent)
export class ClassroomsStudentCreatedHandler
  implements IEventHandler<ClassroomsStudentCreatedEvent>
{
  async handle(event: ClassroomsStudentCreatedEvent) {
    const { classroomsStudent } = event;
    Logger.log(
      `#${classroomsStudent.id} - created!`,
      ClassroomsStudentCreatedHandler.name
    );
    return event;
  }
}
