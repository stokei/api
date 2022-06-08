import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateCourseService } from '.';

describe('CreateCourseService', () => {
  let createCourseService: CreateCourseService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCourseService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCourseService = modRef.get(CreateCourseService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCourseService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
