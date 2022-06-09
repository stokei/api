import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateOrdersSellerService } from '.';

describe('CreateOrdersSellerService', () => {
  let createOrdersSellerService: CreateOrdersSellerService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateOrdersSellerService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createOrdersSellerService = modRef.get(CreateOrdersSellerService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createOrdersSellerService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
