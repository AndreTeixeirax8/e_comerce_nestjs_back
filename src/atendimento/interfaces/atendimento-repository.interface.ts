import { CriaAtendimentoDto, EditaAtendimentoDto } from "src/atendimento/dtos";

export abstract class IAtendimetoRepository{
    abstract criaUmRegistro:(data: CriaAtendimentoDto,) => Promise<CriaAtendimentoDto>
    abstract buscaTodos:()=> Promise<CriaAtendimentoDto[]>
    abstract editaUmRegistro:( data: EditaAtendimentoDto,)=> Promise<EditaAtendimentoDto> 
}