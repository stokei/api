import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveProjectsPlanService } from '.';

describe('RemoveProjectsPlanService', () => {
  let removeProjectsPlanService: RemoveProjectsPlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveProjectsPlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeProjectsPlanService = modRef.get(RemoveProjectsPlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeProjectsPlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
