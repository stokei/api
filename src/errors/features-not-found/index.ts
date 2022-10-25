import { NotFoundException } from '@nestjs/common';

export class FeaturesNotFoundException extends NotFoundException {
  constructor() {
    super('featuresNotFound');
  }
}
