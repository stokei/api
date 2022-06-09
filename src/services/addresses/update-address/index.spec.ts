import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateAddressService } from '.';

describe('UpdateAddressService', () => {
  let updateAddressService: UpdateAddressService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateAddressService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateAddressService = modRef.get(UpdateAddressService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateAddressService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
