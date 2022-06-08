import { ClassroomsStudentUpdatedEvent } from '@/events/implements/classrooms-students/classrooms-student-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsStudentUpdatedEvent)
export class ClassroomsStudentUpdatedHandler
  implements IEventHandler<ClassroomsStudentUpdatedEvent>
{
  async handle(event: ClassroomsStudentUpdatedEvent) {
    const { classroomsStudent } = event;
    Logger.log(
      `#${classroomsStudent.id} - updated!`,
      ClassroomsStudentUpdatedHandler.name
    );
    return event;
  }
}
