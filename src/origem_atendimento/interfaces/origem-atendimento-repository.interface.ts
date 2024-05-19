import { CriaOrigemAtendimentoDto, EditaOrigemAtendimentoDto } from "src/origem_atendimento/dtos";

export abstract class IOrigemAtendimentoRepository{
    criaUmRegistro:(data: CriaOrigemAtendimentoDto,)=> Promise<CriaOrigemAtendimentoDto> 
    buscaTodos:()=> Promise<CriaOrigemAtendimentoDto[]> 
    editaUmRegistro:(data: EditaOrigemAtendimentoDto)=> Promise<EditaOrigemAtendimentoDto> 
    buscaUmPorId:(id:string)=> Promise<CriaOrigemAtendimentoDto> 
}