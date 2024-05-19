import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrigemAtendimentoEntity } from "src/origem_atendimento/entities";
import { Repository } from "typeorm";
import { CriaOrigemAtendimentoDto, EditaOrigemAtendimentoDto } from "src/origem_atendimento/dtos";
import { IOrigemAtendimentoRepository } from "src/origem_atendimento/interfaces";

@Injectable()
export class OrigemAtendimentoRepository implements IOrigemAtendimentoRepository{
    constructor(
        @InjectRepository(OrigemAtendimentoEntity)
        private origemAtendimentoRepository: Repository<OrigemAtendimentoEntity>,
    ){}

     criaUmRegistro(
        data: CriaOrigemAtendimentoDto,
      ): Promise<CriaOrigemAtendimentoDto> {
        return this.origemAtendimentoRepository.save(data);
      }

       buscaTodos(): Promise<CriaOrigemAtendimentoDto[]> {
        return this.origemAtendimentoRepository.find();
      }

      editaUmRegistro(
        data: EditaOrigemAtendimentoDto,
      ): Promise<EditaOrigemAtendimentoDto> {
        return this.origemAtendimentoRepository.save(data);
      }

      buscaUmPorId(id:string): Promise<CriaOrigemAtendimentoDto> {
        return this.origemAtendimentoRepository.findOneBy({id});
      }

     
      }