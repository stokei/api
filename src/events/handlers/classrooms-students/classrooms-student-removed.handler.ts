import { ClassroomsStudentRemovedEvent } from '@/events/implements/classrooms-students/classrooms-student-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
