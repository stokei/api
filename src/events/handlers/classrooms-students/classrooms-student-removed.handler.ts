import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsStudentRemovedEvent } from '@/events/implements/classrooms-students/classrooms-student-removed.event';

@EventsHandler(ClassroomsStudentRemovedEvent)
export class ClassroomsStudentRemovedHandler
  implements IEventHandler<ClassroomsStudentRemovedEvent>
{
  async handle(event: ClassroomsStudentRemovedEvent) {
    const { classroomsStudent } = event;
    Logger.log(
      `#${classroomsStudent.id} - removed!`,
      ClassroomsStudentRemovedHandler.name
    );
    return event;
  }
}
