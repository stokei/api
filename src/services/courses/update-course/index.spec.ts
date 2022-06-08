import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateCourseService } from '.';

describe('UpdateCourseService', () => {
  let updateCourseService: UpdateCourseService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCourseService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCourseService = modRef.get(UpdateCourseService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCourseService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
