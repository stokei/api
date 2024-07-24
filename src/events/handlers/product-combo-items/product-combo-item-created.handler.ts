import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductComboItemCreatedEvent } from '@/events/implements/product-combo-items/product-combo-item-created.event';

@EventsHandler(ProductComboItemCreatedEvent)
export class ProductComboItemCreatedHandler
  implements IEventHandler<ProductComboItemCreatedEvent>
{
  async handle(event: ProductComboItemCreatedEvent) {
    const { productComboItem } = event;
    Logger.log(
      `#${productComboItem.id} - created!`,
      ProductComboItemCreatedHandler.name
    );
    return event;
  }
}
