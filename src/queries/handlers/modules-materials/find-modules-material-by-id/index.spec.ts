import { FindModulesMaterialByIdRepository } from '@/repositories/modules-materials/find-modules-material-by-id';
import { Test } from '@nestjs/testing';
import { FindModulesMaterialByIdQueryHandler } from '.';

describe('FindModulesMaterialByIdQueryHandler', () => {
  let findModulesMaterialByIdRepository: FindModulesMaterialByIdRepository;
  let findModulesMaterialByIdQueryHandler: FindModulesMaterialByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindModulesMaterialByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindModulesMaterialByIdQueryHandler
      ]
    }).compile();

    findModulesMaterialByIdRepository = moduleRef.get(
      FindModulesMaterialByIdRepository
    );
    findModulesMaterialByIdQueryHandler = moduleRef.get(
      FindModulesMaterialByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findModulesMaterialByIdQueryHandler).toBeDefined();
    expect(findModulesMaterialByIdRepository).toBeDefined();
  });
});
