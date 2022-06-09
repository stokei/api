import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateOrdersAddressService } from '.';

describe('UpdateOrdersAddressService', () => {
  let updateOrdersAddressService: UpdateOrdersAddressService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateOrdersAddressService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateOrdersAddressService = modRef.get(UpdateOrdersAddressService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateOrdersAddressService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
