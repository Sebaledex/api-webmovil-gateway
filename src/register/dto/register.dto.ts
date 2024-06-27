import { IsNotEmpty, IsOptional, IsString, IsNumber, isDateString, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly checkIn: Date;

  @ApiProperty()
  @IsDateString()
  readonly checkOut: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly coordinates: {
    latitude: Number;
    longitude: Number;
  };

  @ApiProperty()
  readonly coordinatesOut: {
    latitude: Number;
    longitude: Number;
  };
  
  @ApiProperty()
  @IsBoolean()
  readonly edited:Boolean;

  @ApiProperty()
  @IsString()
  readonly editedBy: string;
}
