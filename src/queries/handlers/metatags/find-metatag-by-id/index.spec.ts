import { FindMetatagByIdRepository } from '@/repositories/metatags/find-metatag-by-id';
import { Test } from '@nestjs/testing';
import { FindMetatagByIdQueryHandler } from '.';

describe('FindMetatagByIdQueryHandler', () => {
  let findMetatagByIdRepository: FindMetatagByIdRepository;
  let findMetatagByIdQueryHandler: FindMetatagByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindMetatagByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindMetatagByIdQueryHandler
      ]
    }).compile();

    findMetatagByIdRepository = moduleRef.get(FindMetatagByIdRepository);
    findMetatagByIdQueryHandler = moduleRef.get(FindMetatagByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findMetatagByIdQueryHandler).toBeDefined();
    expect(findMetatagByIdRepository).toBeDefined();
  });
});
