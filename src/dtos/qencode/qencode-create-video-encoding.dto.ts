interface QencodeCreateVideoEncodingVideoDTO {
  id: string;
  name: string;
  temporaryURL: string;
}

export interface QencodeCreateVideoEncodingDTO {
  video: QencodeCreateVideoEncodingVideoDTO;
}

export interface QencodeCreateVideoEncodingResponse {
  id: string;
}
