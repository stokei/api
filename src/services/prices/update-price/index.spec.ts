import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdatePriceService } from '.';

describe('UpdatePriceService', () => {
  let updatePriceService: UpdatePriceService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdatePriceService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updatePriceService = modRef.get(UpdatePriceService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updatePriceService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
