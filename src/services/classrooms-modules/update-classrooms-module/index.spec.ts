import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateClassroomsModuleService } from '.';

describe('UpdateClassroomsModuleService', () => {
  let updateClassroomsModuleService: UpdateClassroomsModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsModuleService = modRef.get(UpdateClassroomsModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
