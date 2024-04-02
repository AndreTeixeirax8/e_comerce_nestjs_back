import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { jwtConstants } from 'src/auth/constants';

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

  async veridiedUser(token:any){
    if(!token){
       throw new HttpException('Não autorizado',HttpStatus.NOT_FOUND)
    }

    try{
      
      let decoded:any = jwt.verify(token,jwtConstants.secret)

      if(!decoded){
        throw new HttpException('não autorizado', HttpStatus.NOT_FOUND)
      }
    
      const user= await this.userRepository.findOneOrFail(decoded.sub)
        if(!user){
          throw new HttpException('não user', HttpStatus.NOT_FOUND)
        }

        if(user){
          if(user.roles && user.roles === 'admin'){
            return JSON.stringify('Authorized')
          }else{
            throw new HttpException('Nao autorizado',HttpStatus.NOT_FOUND)
          }
        }

    }catch(err){
        console.log('error',err)
        return err
    }

  }

}
