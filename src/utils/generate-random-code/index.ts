import { customAlphabet } from 'nanoid';

export const generateRandomCode = customAlphabet('1234567890abcdef', 10);
