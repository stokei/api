import { ClassroomsEnrollmentRemovedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsEnrollmentRemovedEvent)
export class ClassroomsEnrollmentRemovedHandler
  implements IEventHandler<ClassroomsEnrollmentRemovedEvent>
{
  async handle(event: ClassroomsEnrollmentRemovedEvent) {
    const { classroomsEnrollment } = event;
    Logger.log(
      `#${classroomsEnrollment.id} - removed!`,
      ClassroomsEnrollmentRemovedHandler.name
    );
    return event;
  }
}
