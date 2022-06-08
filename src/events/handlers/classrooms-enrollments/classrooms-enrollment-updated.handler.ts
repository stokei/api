import { ClassroomsEnrollmentUpdatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsEnrollmentUpdatedEvent)
export class ClassroomsEnrollmentUpdatedHandler
  implements IEventHandler<ClassroomsEnrollmentUpdatedEvent>
{
  async handle(event: ClassroomsEnrollmentUpdatedEvent) {
    const { classroomsEnrollment } = event;
    Logger.log(
      `#${classroomsEnrollment.id} - updated!`,
      ClassroomsEnrollmentUpdatedHandler.name
    );
    return event;
  }
}
