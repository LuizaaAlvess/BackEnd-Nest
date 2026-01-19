import { Module } from "@nestjs/common"; // Importamos o pacote Common com os decoradores , utilizados na implementação da Classe PostagemModule
import { TypeOrmModule} from "@nestjs/typeorm"; //Importamos o pacote TypeORM com os decoradores , que são usados ​​para trabalhar com o banco de dados.
import { PostagemController } from "./controllers/postagem.controller"
import { Postagem } from "./entities/postagem.entity"; //Importamos a Classe Postagem , que foi criada anteriormente
import { PostagemService } from "./services/postagem.service"; //Importamos a Classe PostagemService , que foi criada anteriormente 

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports: [],
})
export class PostagemModule {}