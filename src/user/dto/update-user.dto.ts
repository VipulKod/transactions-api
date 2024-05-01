import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John Doe', description: 'The username of the user.' })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user.' })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiProperty({ enum: ['buyer', 'seller'], description: 'The type of the user.' })
  @IsOptional()
  @IsEnum(['buyer', 'seller'])
  readonly user_type?: 'buyer' | 'seller';
}
