import { ClassroomsEnrollmentCreatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsEnrollmentCreatedEvent)
export class ClassroomsEnrollmentCreatedHandler
  implements IEventHandler<ClassroomsEnrollmentCreatedEvent>
{
  async handle(event: ClassroomsEnrollmentCreatedEvent) {
    const { classroomsEnrollment } = event;
    Logger.log(
      `#${classroomsEnrollment.id} - created!`,
      ClassroomsEnrollmentCreatedHandler.name
    );
    return event;
  }
}
