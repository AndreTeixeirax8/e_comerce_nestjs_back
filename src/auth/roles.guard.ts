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

        if(!requiredRoles){
            return true
        }

        if(requiredRoles){
            console.log("requerido",requiredRoles)
        }

        const  getToken =  context.switchToHttp().getRequest()['rawHeaders'][1].split(''[1])
        console.log('getToken' ,getToken)

        let decoded = jwt.verify(getToken,jwtConstants.secret)
        
        let userResult:any

       await this.userService.findUserRoleByUserId(decoded.sub).then(data =>{

        if(data){
           userResult =data 
        }

       })

       return requiredRoles.some(role => role === userResult)

    }

}