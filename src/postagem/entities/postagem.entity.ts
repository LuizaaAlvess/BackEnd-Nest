import { IsNotEmpty } from "class-validator"; //Importamos pacote o Validação com os decoradores fornecidos
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"; //Importamos o pacote TypeORM com os decoradores
import { Tema } from "../../tema/entities/tema.entity";
@Entity({name: "tb_postagens"}) // O decorador @Entity é utilizado para marcar a classe como uma entidade , ou seja, uma classe que será mapeada para uma tabela no Banco de dados.
export class Postagem {

    @PrimaryGeneratedColumn() //O decorador @PrimaryGeneratedColumn indica que o atributo id será a Chave Primária (Primary Key - PK) da tabela tb_postagens
    id: number;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    titulo: string;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    texto: string

    @UpdateDateColumn() //O decorador @UpdateDateColumn configura o atributo data como um Timestamp , ou seja, toda vez que um objeto da classe Postagem for criado ou atualizado, o NestJS irá automaticamente preencher esse campo com a data e a hora atual do Sistema Operacional.
    data: Date

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema

}

//Linhas 8, 12, 16 e 19: Definem os atributos da Classe Postagem, que abrangem os campos (colunas) na tabela tb_postagens
//Nas linhas 10 e 14: O decorador @IsNotEmpty , que faz parte do pacote Validation , define que o valor do Atributo não pode ser vazio, ou seja, precisa ser enviado algum valor.
//Linhas 11 e 15: O decorador @Column define que o atributo será adicionado à tabela que será criada no Banco de dados, além de permitir configurar as respectivas propriedades do atributo, como o tipo de dados, tamanho, e outras configurações relacionadas