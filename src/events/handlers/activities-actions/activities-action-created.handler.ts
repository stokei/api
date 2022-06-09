import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ActivitiesActionCreatedEvent } from '@/events/implements/activities-actions/activities-action-created.event';

@EventsHandler(ActivitiesActionCreatedEvent)
export class ActivitiesActionCreatedHandler
  implements IEventHandler<ActivitiesActionCreatedEvent>
{
  async handle(event: ActivitiesActionCreatedEvent) {
    const { activitiesAction } = event;
    Logger.log(
      `#${activitiesAction.id} - created!`,
      ActivitiesActionCreatedHandler.name
    );
    return event;
  }
}
