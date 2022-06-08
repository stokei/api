import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemovePriceService } from '.';

describe('RemovePriceService', () => {
  let removePriceService: RemovePriceService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemovePriceService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removePriceService = modRef.get(RemovePriceService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removePriceService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
