import { PlanUpdatedEvent } from '@/events/implements/plans/plan-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PlanUpdatedEvent)
export class PlanUpdatedHandler implements IEventHandler<PlanUpdatedEvent> {
  async handle(event: PlanUpdatedEvent) {
    const { plan } = event;
    Logger.log(`#${plan.id} - updated!`, PlanUpdatedHandler.name);
    return event;
  }
}
