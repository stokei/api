import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateOrderService } from '.';

describe('CreateOrderService', () => {
  let createOrderService: CreateOrderService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateOrderService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createOrderService = modRef.get(CreateOrderService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createOrderService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
