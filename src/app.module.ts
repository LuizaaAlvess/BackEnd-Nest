import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //Importamos o pacote TypeORMModule , previamente instalado no projeto
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

@Module ({
  imports: [ // Adicionamos o módulo TypeORMModule ao array imports
    TypeOrmModule.forRoot({
      type: 'mysql', //Um tipo de propriedade especifica o tipo de banco de dados que será utilizado, neste caso, MySQL
      host: 'localhost', //A propriedade host define o endereço do servidor onde o banco de dados está hospedado. O valor localhost refere-se ao seu computador local. 
      port: 3306, //A propriedade port indica o número da porta associada ao banco de dados.
      username: 'root', // Um nome de usuário de propriedade define o usuário que será utilizado para acessar o banco de dados
      password: 'root', // Uma senha de propriedade especifica a senha do usuário definida anteriormente. O valor root é a senha padrão do MySQL
      database: 'db_blogpessoal', //Um banco de dados de propriedade define o nome do banco de dados que será utilizado
      entities: [Postagem], //A propriedade entidades é configurada inicialmente com um array vazio. Após a criação das Classes Entidade , elas serão adicionadas a esse array para que o TypeORM possa gerar as tabelas correspondentes no banco de dados
      synchronize: true, //A propriedadesync , definida como true , permite que as tabelas do banco de dados sejam criadas ou atualizadas automaticamente sempre que a aplicação for inicializada.
      logging: true, //A propriedade logging , definida como true , habilita o registro de logs das operações realizadas pelo TypeORM no console, o que é útil para fins de depuração e monitoramento.
    }),
    PostagemModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}