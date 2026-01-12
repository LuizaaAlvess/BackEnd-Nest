import { Injectable } from "@nestjs/common"; //Importamos o pacote Common com os decoradores
import { InjectRepository } from "@nestjs/typeorm"; //Importamos o pacote TypeORM com os decoradores
import { Repository } from "typeorm"; //Importamos a classe Repository do módulo typeorm.
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }
    }

