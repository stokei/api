import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveClassroomsMaterialService } from '.';

describe('RemoveClassroomsMaterialService', () => {
  let removeClassroomsMaterialService: RemoveClassroomsMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsMaterialService = modRef.get(
      RemoveClassroomsMaterialService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
