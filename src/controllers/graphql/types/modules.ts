import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Module } from './module';

@ObjectType()
export class Modules extends Paginated(Module) {}
