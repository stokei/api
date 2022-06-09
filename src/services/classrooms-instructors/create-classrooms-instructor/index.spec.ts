import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomsInstructorService } from '.';

describe('CreateClassroomsInstructorService', () => {
  let createClassroomsInstructorService: CreateClassroomsInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomsInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomsInstructorService = modRef.get(
      CreateClassroomsInstructorService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomsInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
