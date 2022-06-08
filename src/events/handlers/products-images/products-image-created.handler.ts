import { ProductsImageCreatedEvent } from '@/events/implements/products-images/products-image-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductsImageCreatedEvent)
export class ProductsImageCreatedHandler
  implements IEventHandler<ProductsImageCreatedEvent>
{
  async handle(event: ProductsImageCreatedEvent) {
    const { productsImage } = event;
    Logger.log(
      `#${productsImage.id} - created!`,
      ProductsImageCreatedHandler.name
    );
    return event;
  }
}
