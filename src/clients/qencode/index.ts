import QencodeApiClient from 'qencode-api';

import { QENCODE_ACCESS_KEY } from '@/environments';

export const qencodeApiClient = new QencodeApiClient(QENCODE_ACCESS_KEY);
