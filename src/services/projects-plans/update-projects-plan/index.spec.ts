import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateProjectsPlanService } from '.';

describe('UpdateProjectsPlanService', () => {
  let updateProjectsPlanService: UpdateProjectsPlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateProjectsPlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateProjectsPlanService = modRef.get(UpdateProjectsPlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateProjectsPlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
