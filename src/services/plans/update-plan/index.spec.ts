import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdatePlanService } from '.';

describe('UpdatePlanService', () => {
  let updatePlanService: UpdatePlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdatePlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updatePlanService = modRef.get(UpdatePlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updatePlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
