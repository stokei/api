import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreatePlanService } from '.';

describe('CreatePlanService', () => {
  let createPlanService: CreatePlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreatePlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createPlanService = modRef.get(CreatePlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createPlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
