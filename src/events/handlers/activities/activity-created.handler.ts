import { ActivityCreatedEvent } from '@/events/implements/activities/activity-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ActivityCreatedEvent)
export class ActivityCreatedHandler
  implements IEventHandler<ActivityCreatedEvent>
{
  async handle(event: ActivityCreatedEvent) {
    const { activity } = event;
    Logger.log(`#${activity.id} - created!`, ActivityCreatedHandler.name);
    return event;
  }
}
