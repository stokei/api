import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';

@EventsHandler(PlanCreatedEvent)
export class PlanCreatedHandler implements IEventHandler<PlanCreatedEvent> {
  async handle(event: PlanCreatedEvent) {
    const { plan } = event;
    Logger.log(`#${plan.id} - created!`, PlanCreatedHandler.name);
    return event;
  }
}
