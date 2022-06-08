import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateProjectsPlanService } from '.';

describe('CreateProjectsPlanService', () => {
  let createProjectsPlanService: CreateProjectsPlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateProjectsPlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createProjectsPlanService = modRef.get(CreateProjectsPlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createProjectsPlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
