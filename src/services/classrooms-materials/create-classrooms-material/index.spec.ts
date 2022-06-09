import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomsMaterialService } from '.';

describe('CreateClassroomsMaterialService', () => {
  let createClassroomsMaterialService: CreateClassroomsMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomsMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomsMaterialService = modRef.get(
      CreateClassroomsMaterialService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomsMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
