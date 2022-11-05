import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AppInstructorRemovedEvent } from '@/events/implements/app-instructors/app-instructor-removed.event';

@EventsHandler(AppInstructorRemovedEvent)
export class AppInstructorRemovedHandler
  implements IEventHandler<AppInstructorRemovedEvent>
{
  async handle(event: AppInstructorRemovedEvent) {
    const { appInstructor } = event;
    Logger.log(
      `#${appInstructor.id} - removed!`,
      AppInstructorRemovedHandler.name
    );
    return event;
  }
}
