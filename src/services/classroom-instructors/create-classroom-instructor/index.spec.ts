import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomInstructorService } from '.';

describe('CreateClassroomInstructorService', () => {
  let createClassroomInstructorService: CreateClassroomInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomInstructorService = modRef.get(
      CreateClassroomInstructorService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
