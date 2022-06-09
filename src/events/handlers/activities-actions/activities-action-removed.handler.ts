import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ActivitiesActionRemovedEvent } from '@/events/implements/activities-actions/activities-action-removed.event';

@EventsHandler(ActivitiesActionRemovedEvent)
export class ActivitiesActionRemovedHandler
  implements IEventHandler<ActivitiesActionRemovedEvent>
{
  async handle(event: ActivitiesActionRemovedEvent) {
    const { activitiesAction } = event;
    Logger.log(
      `#${activitiesAction.id} - removed!`,
      ActivitiesActionRemovedHandler.name
    );
    return event;
  }
}
