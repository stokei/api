import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemovePlanService } from '.';

describe('RemovePlanService', () => {
  let removePlanService: RemovePlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemovePlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removePlanService = modRef.get(RemovePlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removePlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
