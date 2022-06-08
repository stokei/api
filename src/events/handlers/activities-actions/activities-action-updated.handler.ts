import { ActivitiesActionUpdatedEvent } from '@/events/implements/activities-actions/activities-action-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
