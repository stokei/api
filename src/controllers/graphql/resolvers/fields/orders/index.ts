import { OrderAppResolver } from './app';
import { OrderReferenceResolver } from './reference';

export const OrdersFieldsResolvers = [OrderReferenceResolver, OrderAppResolver];
