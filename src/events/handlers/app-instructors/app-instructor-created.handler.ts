import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AppInstructorCreatedEvent } from '@/events/implements/app-instructors/app-instructor-created.event';

@EventsHandler(AppInstructorCreatedEvent)
export class AppInstructorCreatedHandler
  implements IEventHandler<AppInstructorCreatedEvent>
{
  async handle(event: AppInstructorCreatedEvent) {
    const { appInstructor } = event;
    Logger.log(
      `#${appInstructor.id} - created!`,
      AppInstructorCreatedHandler.name
    );
    return event;
  }
}
