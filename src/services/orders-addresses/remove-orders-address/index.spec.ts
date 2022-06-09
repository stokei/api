import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveOrdersAddressService } from '.';

describe('RemoveOrdersAddressService', () => {
  let removeOrdersAddressService: RemoveOrdersAddressService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveOrdersAddressService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeOrdersAddressService = modRef.get(RemoveOrdersAddressService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeOrdersAddressService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
