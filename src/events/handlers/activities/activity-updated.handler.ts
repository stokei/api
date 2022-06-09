import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ActivityUpdatedEvent } from '@/events/implements/activities/activity-updated.event';

@EventsHandler(ActivityUpdatedEvent)
export class ActivityUpdatedHandler
  implements IEventHandler<ActivityUpdatedEvent>
{
  async handle(event: ActivityUpdatedEvent) {
    const { activity } = event;
    Logger.log(`#${activity.id} - updated!`, ActivityUpdatedHandler.name);
    return event;
  }
}
