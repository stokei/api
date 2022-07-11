import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomModuleService } from '.';

describe('CreateClassroomModuleService', () => {
  let createClassroomModuleService: CreateClassroomModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomModuleService = modRef.get(CreateClassroomModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
