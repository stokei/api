import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ActivityRemovedEvent } from '@/events/implements/activities/activity-removed.event';

@EventsHandler(ActivityRemovedEvent)
export class ActivityRemovedHandler
  implements IEventHandler<ActivityRemovedEvent>
{
  async handle(event: ActivityRemovedEvent) {
    const { activity } = event;
    Logger.log(`#${activity.id} - removed!`, ActivityRemovedHandler.name);
    return event;
  }
}
