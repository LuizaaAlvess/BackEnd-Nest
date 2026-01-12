import { Module } from "@nestjs/common"; // Importamos o pacote Common com os decoradores , utilizados na implementação da Classe PostagemModule
import { TypeOrmModule} from "@nestjs/typeorm"; //Importamos o pacote TypeORM com os decoradores , que são usados ​​para trabalhar com o banco de dados.
import { Postagem } from "./entities/postagem.entity"; //Importamos a Classe Postagem , que foi criada anteriormente

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    providers: [],
    controllers: [],
    exports: [],
})
export class PostagemModule {}