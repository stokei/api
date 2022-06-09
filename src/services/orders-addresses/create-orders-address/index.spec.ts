import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateOrdersAddressService } from '.';

describe('CreateOrdersAddressService', () => {
  let createOrdersAddressService: CreateOrdersAddressService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateOrdersAddressService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createOrdersAddressService = modRef.get(CreateOrdersAddressService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createOrdersAddressService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
