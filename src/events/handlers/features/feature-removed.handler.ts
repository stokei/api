import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FeatureRemovedEvent } from '@/events/implements/features/feature-removed.event';

@EventsHandler(FeatureRemovedEvent)
export class FeatureRemovedHandler
  implements IEventHandler<FeatureRemovedEvent>
{
  async handle(event: FeatureRemovedEvent) {
    const { feature } = event;
    Logger.log(`#${feature.id} - removed!`, FeatureRemovedHandler.name);
    return event;
  }
}
