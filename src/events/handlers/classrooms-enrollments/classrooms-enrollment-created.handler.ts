import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsEnrollmentCreatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-created.event';

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
