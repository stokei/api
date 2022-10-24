import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FeatureCreatedEvent } from '@/events/implements/features/feature-created.event';

@EventsHandler(FeatureCreatedEvent)
export class FeatureCreatedHandler
  implements IEventHandler<FeatureCreatedEvent>
{
  async handle(event: FeatureCreatedEvent) {
    const { feature } = event;
    Logger.log(`#${feature.id} - created!`, FeatureCreatedHandler.name);
    return event;
  }
}
