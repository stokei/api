import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CalculatePricesInformationService } from '.';

describe('CalculatePricesInformationService', () => {
  let calculatePricesInformationService: CalculatePricesInformationService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CalculatePricesInformationService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    calculatePricesInformationService = modRef.get(
      CalculatePricesInformationService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(calculatePricesInformationService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
