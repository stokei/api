import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateOrdersSellerService } from '.';

describe('UpdateOrdersSellerService', () => {
  let updateOrdersSellerService: UpdateOrdersSellerService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateOrdersSellerService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateOrdersSellerService = modRef.get(UpdateOrdersSellerService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateOrdersSellerService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
