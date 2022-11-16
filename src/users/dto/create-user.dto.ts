import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  user_type: string;
}
