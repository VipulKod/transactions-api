import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  username: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['buyer', 'seller'])
  @ApiProperty({
    example: 'buyer',
    enum: ['buyer', 'seller'],
    description: 'Type of the user',
  })
  user_type: string;
}
