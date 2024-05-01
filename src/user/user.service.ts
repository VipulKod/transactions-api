import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user in the database.
   * @param createUserDto Data transfer object containing user details.
   * @returns Promise resolving to the created User entity.
   */
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.user_type = createUserDto.user_type;
    return this.userRepository.save(user);
  }

  /**
   * Retrieves all users from the database.
   * @returns Promise resolving to an array of User entities.
   */
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Retrieves a user by their ID.
   * @param user_id The ID of the user to retrieve.
   * @returns Promise resolving to the User entity with the given ID.
   */
  viewUser(user_id: string): Promise<User> {
    return this.userRepository.findOne({ where: { user_id } });
  }

  /**
   * Updates a user in the database.
   * @param user_id The ID of the user to update.
   * @param updateUserDto Data transfer object containing the updated user details.
   * @returns Promise resolving to the updated User entity.
   */
  updateUser(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.user_id = user_id;
    return this.userRepository.save(user);
  }

  /**
   * Deletes a user from the database.
   * @param id The ID of the user to delete.
   * @returns Promise resolving to the number of affected rows.
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
