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
        
   
     
        const teste = context.switchToHttp().getRequest();
            const rawHeaders = teste.rawHeaders;
            let token = '';

            for (let i = 0; i < rawHeaders.length; i += 2) {
            if (rawHeaders[i] === 'Authorization') {
                token = rawHeaders[i + 1].replace('Bearer ', '');
                break;
            }
            }

        

        if(!requiredRoles){
            return true
        }

        let decoded = jwt.verify(token,jwtConstants.secret)
       
        let userResult:any

        await this.userService.findUserRoleByUserId(decoded.sub).then(data =>{
            if (data){
               userResult =data  
            }
        })

        return requiredRoles.some(role => role === userResult)

      
    }

}