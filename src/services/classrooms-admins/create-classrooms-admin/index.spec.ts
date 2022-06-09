import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomsAdminService } from '.';

describe('CreateClassroomsAdminService', () => {
  let createClassroomsAdminService: CreateClassroomsAdminService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomsAdminService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomsAdminService = modRef.get(CreateClassroomsAdminService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomsAdminService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
