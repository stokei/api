import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PlanUpdatedEvent } from '@/events/implements/plans/plan-updated.event';

@EventsHandler(PlanUpdatedEvent)
export class PlanUpdatedHandler implements IEventHandler<PlanUpdatedEvent> {
  async handle(event: PlanUpdatedEvent) {
    const { plan } = event;
    Logger.log(`#${plan.id} - updated!`, PlanUpdatedHandler.name);
    return event;
  }
}
