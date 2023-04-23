import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FeatureUpdatedEvent } from '@/events/implements/features/feature-updated.event';

@EventsHandler(FeatureUpdatedEvent)
export class FeatureUpdatedHandler
  implements IEventHandler<FeatureUpdatedEvent>
{
  async handle(event: FeatureUpdatedEvent) {
    const { feature } = event;
    Logger.log(`#${feature.id} - updated!`, FeatureUpdatedHandler.name);
    return event;
  }
}
