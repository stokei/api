import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductComboItemRemovedEvent } from '@/events/implements/product-combo-items/product-combo-item-removed.event';

@EventsHandler(ProductComboItemRemovedEvent)
export class ProductComboItemRemovedHandler
  implements IEventHandler<ProductComboItemRemovedEvent>
{
  async handle(event: ProductComboItemRemovedEvent) {
    const { productComboItem } = event;
    Logger.log(
      `#${productComboItem.id} - removed!`,
      ProductComboItemRemovedHandler.name
    );
    return event;
  }
}
