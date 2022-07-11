import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateClassroomModuleService } from '.';

describe('UpdateClassroomModuleService', () => {
  let updateClassroomModuleService: UpdateClassroomModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomModuleService = modRef.get(UpdateClassroomModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
