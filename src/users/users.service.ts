import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectEntityManager() private postManager: EntityManager
  ){}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create({
      ...createUserDto
    })

    await this.userRepository.save(newUser)

    return newUser

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(testName:string) {
    const userWithEntityManager = await this.postManager
    .createQueryBuilder(UserEntity,'user')
    .where("user.username= :name", {name:testName})
    .getOne()

    if(!userWithEntityManager){
      throw new HttpException('invalido',HttpStatus.NOT_FOUND)
    }
    return userWithEntityManager
  }

  async findUserRoleByUserId(id:any){
    const user = await this.userRepository.findOne(id)

    if(!user){
      throw new HttpException('No user foud  by id', HttpStatus.NOT_FOUND)
    }

    return user.roles

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
