import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCourseStudentService } from '.';

describe('CreateCourseStudentService', () => {
  let createCourseStudentService: CreateCourseStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCourseStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCourseStudentService = modRef.get(CreateCourseStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCourseStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
