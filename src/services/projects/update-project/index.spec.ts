import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateProjectService } from '.';

describe('UpdateProjectService', () => {
  let updateProjectService: UpdateProjectService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateProjectService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateProjectService = modRef.get(UpdateProjectService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateProjectService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
