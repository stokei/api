import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PlanRemovedEvent } from '@/events/implements/plans/plan-removed.event';

@EventsHandler(PlanRemovedEvent)
export class PlanRemovedHandler implements IEventHandler<PlanRemovedEvent> {
  async handle(event: PlanRemovedEvent) {
    const { plan } = event;
    Logger.log(`#${plan.id} - removed!`, PlanRemovedHandler.name);
    return event;
  }
}
