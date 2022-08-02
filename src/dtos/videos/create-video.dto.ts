import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDTO {
  @ApiProperty()
  parent: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  description?: string;

  @ApiProperty({ nullable: true })
  poster?: string;

  app: string;
  path: string;
  createdBy: string;
}
