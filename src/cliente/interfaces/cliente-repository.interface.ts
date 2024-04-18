import { CriaClienteDto } from "src/cliente/dtos";

export abstract class IClienteRepository{
   abstract criaUmRegistro:(
        data: CriaClienteDto,
      )=> Promise<CriaClienteDto>
}