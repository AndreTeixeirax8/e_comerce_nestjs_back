import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
        ){}

    async validateUser(username:string,pass:string){

        const user = await this.userService.findOne(username)
        let value = bcrypt.compareSync(pass,user.password)
        if(user && value ){
            const {password,...result} = user
            return result
        }

       
        return null

    }

    async login(user:any){
        const payload = {username:user.username,sub:user.id}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
