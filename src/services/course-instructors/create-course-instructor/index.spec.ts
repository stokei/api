import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCourseInstructorService } from '.';

describe('CreateCourseInstructorService', () => {
  let createCourseInstructorService: CreateCourseInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCourseInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCourseInstructorService = modRef.get(CreateCourseInstructorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCourseInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
