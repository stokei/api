import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UsageRecordCreatedEvent } from '@/events/implements/usage-records/usage-record-created.event';

@EventsHandler(UsageRecordCreatedEvent)
export class UsageRecordCreatedHandler
  implements IEventHandler<UsageRecordCreatedEvent>
{
  async handle(event: UsageRecordCreatedEvent) {
    const { usageRecord } = event;
    Logger.log(`#${usageRecord.id} - created!`, UsageRecordCreatedHandler.name);
    return event;
  }
}
