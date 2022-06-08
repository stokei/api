import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveClassroomsTagService } from '.';

describe('RemoveClassroomsTagService', () => {
  let removeClassroomsTagService: RemoveClassroomsTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsTagService = modRef.get(RemoveClassroomsTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
