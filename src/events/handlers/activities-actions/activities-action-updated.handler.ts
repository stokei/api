import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ActivitiesActionUpdatedEvent } from '@/events/implements/activities-actions/activities-action-updated.event';

@EventsHandler(ActivitiesActionUpdatedEvent)
export class ActivitiesActionUpdatedHandler
  implements IEventHandler<ActivitiesActionUpdatedEvent>
{
  async handle(event: ActivitiesActionUpdatedEvent) {
    const { activitiesAction } = event;
    Logger.log(
      `#${activitiesAction.id} - updated!`,
      ActivitiesActionUpdatedHandler.name
    );
    return event;
  }
}
