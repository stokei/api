import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateAddressService } from '.';

describe('CreateAddressService', () => {
  let createAddressService: CreateAddressService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateAddressService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAddressService = modRef.get(CreateAddressService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAddressService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
