interface QencodeCreateVideoEncodingVideoDTO {
  id: string;
  filename: string;
  url: string;
}

export interface QencodeCreateVideoEncodingDTO {
  video: QencodeCreateVideoEncodingVideoDTO;
}

export interface QencodeCreateVideoEncodingResponse {
  id: string;
}
