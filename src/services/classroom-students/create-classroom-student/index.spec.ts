import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateClassroomStudentService } from '.';

describe('CreateClassroomStudentService', () => {
  let createClassroomStudentService: CreateClassroomStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomStudentService = modRef.get(CreateClassroomStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
