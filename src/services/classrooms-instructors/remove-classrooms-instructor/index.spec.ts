import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveClassroomsInstructorService } from '.';

describe('RemoveClassroomsInstructorService', () => {
  let removeClassroomsInstructorService: RemoveClassroomsInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsInstructorService = modRef.get(
      RemoveClassroomsInstructorService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
