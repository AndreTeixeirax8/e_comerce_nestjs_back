import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AtendimentoEntity } from "src/atendimento/entities";
import { Repository } from "typeorm";
import { EditaAtendimentoDto,CriaAtendimentoDto } from "src/atendimento/dtos";
import { IAtendimentoRepository } from "src/atendimento/interfaces";

@Injectable()
export class AtendimentoRepository implements IAtendimentoRepository{
    constructor(
        @InjectRepository(AtendimentoEntity)
        private atendimentoRepository: Repository<AtendimentoEntity>,
    ){}

     criaUmRegistro(
        data: CriaAtendimentoDto,
      ): Promise<CriaAtendimentoDto> {
        return this.atendimentoRepository.save(data);
      }

       buscaTodos(): Promise<CriaAtendimentoDto[]> {
        return this.atendimentoRepository.find();
      }

      editaUmRegistro(
        data: EditaAtendimentoDto,
      ): Promise<EditaAtendimentoDto> {
        return this.atendimentoRepository.save(data);
      }
    }