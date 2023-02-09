import { cleanObject, cleanValue } from '@stokei/nestjs';

interface TusFileMetadataModelData {
  relativePath?: string;
  name?: string;
  type?: string;
  size?: string;
  filetype?: string;
  filename?: string;
  extension?: string;
  appId?: string;
  accountId?: string;
}

const cleanValueWithUndefinedText = (value?: string) => {
  if (value === 'undefined' || value === 'null') {
    return;
  }
  return cleanValue(value);
};

export class TusFileMetadataModel {
  relativePath?: string;
  name?: string;
  type?: string;
  size?: string;
  filetype?: string;
  filename?: string;
  extension?: string;
  appId?: string;
  accountId?: string;

  constructor(data?: TusFileMetadataModelData) {
    this.relativePath = cleanValueWithUndefinedText(data?.relativePath);
    this.name = cleanValueWithUndefinedText(data?.name);
    this.type = cleanValueWithUndefinedText(data?.type);
    this.size = cleanValueWithUndefinedText(data?.size);
    this.filetype = cleanValueWithUndefinedText(data?.filetype);
    this.filename = cleanValueWithUndefinedText(data?.filename);
    this.extension = cleanValueWithUndefinedText(data?.extension);
    this.appId = cleanValueWithUndefinedText(data?.appId);
    this.accountId = cleanValueWithUndefinedText(data?.accountId);
  }

  get isEmpty(): boolean {
    return !Object.values(cleanObject(this)).length;
  }
}
