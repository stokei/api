import { PlanRemovedEvent } from '@/events/implements/plans/plan-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PlanRemovedEvent)
export class PlanRemovedHandler implements IEventHandler<PlanRemovedEvent> {
  async handle(event: PlanRemovedEvent) {
    const { plan } = event;
    Logger.log(`#${plan.id} - removed!`, PlanRemovedHandler.name);
    return event;
  }
}
