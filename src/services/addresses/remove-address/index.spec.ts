import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveAddressService } from '.';

describe('RemoveAddressService', () => {
  let removeAddressService: RemoveAddressService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveAddressService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeAddressService = modRef.get(RemoveAddressService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeAddressService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
