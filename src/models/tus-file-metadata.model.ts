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
    this.relativePath = data?.relativePath;
    this.name = data?.name;
    this.type = data?.type;
    this.size = data?.size;
    this.filetype = data?.filetype;
    this.filename = data?.filename;
    this.extension = data?.extension;
    this.appId = data?.appId;
    this.accountId = data?.accountId;
  }
}
