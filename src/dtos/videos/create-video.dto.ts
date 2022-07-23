import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDTO {
  @ApiProperty()
  name?: string;

  @ApiProperty({ nullable: true })
  description?: string;

  @ApiProperty()
  path?: string;

  @ApiProperty({ nullable: true })
  poster?: string;

  createdBy: string;
}
