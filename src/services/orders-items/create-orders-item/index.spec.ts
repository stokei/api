import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateOrdersItemService } from '.';

describe('CreateOrdersItemService', () => {
  let createOrdersItemService: CreateOrdersItemService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateOrdersItemService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createOrdersItemService = modRef.get(CreateOrdersItemService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createOrdersItemService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
