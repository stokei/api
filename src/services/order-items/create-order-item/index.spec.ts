import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateOrderItemService } from '.';

describe('CreateOrderItemService', () => {
  let createOrderItemService: CreateOrderItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateOrderItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createOrderItemService = modRef.get(CreateOrderItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createOrderItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
