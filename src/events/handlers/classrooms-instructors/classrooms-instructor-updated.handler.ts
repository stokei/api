import { ClassroomsInstructorUpdatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsInstructorUpdatedEvent)
export class ClassroomsInstructorUpdatedHandler
  implements IEventHandler<ClassroomsInstructorUpdatedEvent>
{
  async handle(event: ClassroomsInstructorUpdatedEvent) {
    const { classroomsInstructor } = event;
    Logger.log(
      `#${classroomsInstructor.id} - updated!`,
      ClassroomsInstructorUpdatedHandler.name
    );
    return event;
  }
}
