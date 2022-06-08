import { ClassroomsStudentCreatedEvent } from '@/events/implements/classrooms-students/classrooms-student-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
