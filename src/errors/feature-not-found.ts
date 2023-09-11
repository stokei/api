import { NotFoundException } from '@nestjs/common';

export class FeatureNotFoundException extends NotFoundException {
  constructor() {
    super('featureNotFound');
  }
}
