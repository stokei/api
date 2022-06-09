import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateClassroomsAdminService } from '.';

describe('UpdateClassroomsAdminService', () => {
  let updateClassroomsAdminService: UpdateClassroomsAdminService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsAdminService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsAdminService = modRef.get(UpdateClassroomsAdminService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsAdminService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
