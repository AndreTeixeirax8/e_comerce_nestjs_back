import { CriaClienteDto, EditaClienteDto } from "src/cliente/dtos";
import { ClienteEntity } from "src/cliente/entities";

export abstract class IClienteRepository{
   abstract criaUmRegistro:(
        data: CriaClienteDto,
      )=> Promise<CriaClienteDto>
 abstract  buscaTodos:()=> Promise<CriaClienteDto[]> 
 abstract editaUmRegistro:(
     data: EditaClienteDto,
   )=> Promise<EditaClienteDto>
   abstract buscaUmPorId:(id:string)=> Promise<CriaClienteDto> 
   abstract buscaPorNomeParcial:(parteDoNome: string)=> Promise<ClienteEntity[]> 

}