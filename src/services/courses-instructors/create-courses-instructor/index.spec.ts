import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCoursesInstructorService } from '.';

describe('CreateCoursesInstructorService', () => {
  let createCoursesInstructorService: CreateCoursesInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCoursesInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCoursesInstructorService = modRef.get(CreateCoursesInstructorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCoursesInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
