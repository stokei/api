import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateClassroomsTagService } from '.';

describe('UpdateClassroomsTagService', () => {
  let updateClassroomsTagService: UpdateClassroomsTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsTagService = modRef.get(UpdateClassroomsTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
