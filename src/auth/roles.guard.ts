import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "./roles.decorator";
import * as jwt from 'jsonwebtoken'
import { jwtConstants } from "./constants";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector:Reflector,
        private userService:UsersService,
        ){}

   async canActivate(context: ExecutionContext)  {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])

        const request:any =context.switchToHttp().getRequest();
        const found = request.rawHeaders.findIndex(e => e.split('')[0] === 'Bearer')

        if(!requiredRoles){
            return true
        }

        let getToken:any

        if(found){
            getToken = request.rawHeaders[found].split('')[1]
        }

        let decoded = jwt.verify(getToken,jwtConstants.secret)
        console.log('decoded roles.guard.ts',decoded)

        let userResult:any

        await this.userService.findUserRoleByUserId(decoded.sub).then(data =>{
            if (data){
               userResult =data  
            }
        })

        return requiredRoles.some(role => role === userResult)

      
    }

}