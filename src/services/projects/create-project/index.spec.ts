import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateProjectService } from '.';

describe('CreateProjectService', () => {
  let createProjectService: CreateProjectService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateProjectService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createProjectService = modRef.get(CreateProjectService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createProjectService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
