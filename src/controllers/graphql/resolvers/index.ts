import { FieldsResolvers } from './fields';
import { Mutations } from './mutations';
import { Queries } from './queries';
import { Subscriptions } from './subscriptions';

export const Resolvers = [
  ...FieldsResolvers,
  ...Mutations,
  ...Queries,
  ...Subscriptions
];
