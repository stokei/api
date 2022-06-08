import { PlanCreatedEvent } from '@/events/implements/plans/plan-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PlanCreatedEvent)
export class PlanCreatedHandler implements IEventHandler<PlanCreatedEvent> {
  async handle(event: PlanCreatedEvent) {
    const { plan } = event;
    Logger.log(`#${plan.id} - created!`, PlanCreatedHandler.name);
    return event;
  }
}
