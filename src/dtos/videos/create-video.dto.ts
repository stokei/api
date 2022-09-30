import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDTO {
  @ApiProperty()
  parent: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  description?: string;

  @ApiProperty({ nullable: true })
  temporaryURL?: string;

  @ApiProperty({ nullable: true })
  poster?: string;

  @ApiProperty({ nullable: true })
  url?: string;

  app: string;
  filename?: string;
  createdBy: string;
}
