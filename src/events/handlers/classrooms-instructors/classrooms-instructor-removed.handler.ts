import { ClassroomsInstructorRemovedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ClassroomsInstructorRemovedEvent)
export class ClassroomsInstructorRemovedHandler
  implements IEventHandler<ClassroomsInstructorRemovedEvent>
{
  async handle(event: ClassroomsInstructorRemovedEvent) {
    const { classroomsInstructor } = event;
    Logger.log(
      `#${classroomsInstructor.id} - removed!`,
      ClassroomsInstructorRemovedHandler.name
    );
    return event;
  }
}
