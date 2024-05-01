import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('api/v1/user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieve all users
  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users.' })
  async findAll() {
    try {
      return await this.userService.findAllUser();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieve a single user by ID
  @Get(':user_id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved a user.' })
  async findOne(@Param('user_id') userId: string) {
    try {
      return await this.userService.viewUser(userId);
    } catch (error) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
  }

  // Update a user by ID
  @Patch(':user_id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated a user.' })
  async update(
    @Param('user_id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.updateUser(userId, updateUserDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
