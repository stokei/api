import { FeatureCreatedHandler } from './feature-created.handler';
import { FeatureRemovedHandler } from './feature-removed.handler';
import { FeatureUpdatedHandler } from './feature-updated.handler';

export const FeatureEventsHandlers = [
  FeatureCreatedHandler,
  FeatureUpdatedHandler,
  FeatureRemovedHandler
];
