import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveCourseService } from '.';

describe('RemoveCourseService', () => {
  let removeCourseService: RemoveCourseService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCourseService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCourseService = modRef.get(RemoveCourseService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCourseService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
