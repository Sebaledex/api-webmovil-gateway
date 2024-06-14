import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/common/interfaces/user.interface';
export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  //@ApiProperty()
  //@IsNotEmpty()
  //@IsString()
  //registerDate: Date;
  //@ApiProperty()// Cambiado a tipo objecto
  //@IsOptional()
  //users?: string;  // Cambiado a IUser
}
