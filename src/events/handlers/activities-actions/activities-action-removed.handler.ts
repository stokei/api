import { ActivitiesActionRemovedEvent } from '@/events/implements/activities-actions/activities-action-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
