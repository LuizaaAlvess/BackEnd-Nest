import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) {}

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return this.usuarioRepository.findOne({
            where: { usuario }
        });
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id }
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {

        const usuarioBusca = await this.findByUsuario(usuario.usuario);

        if (usuarioBusca)
            throw new HttpException("O usuário já existe!", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        const usuarioExistente = await this.findById(usuario.id);
        const usuarioBusca = await this.findByUsuario(usuario.usuario);

        if (usuarioBusca && usuarioBusca.id !== usuario.id)
            throw new HttpException('Usuário já cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return this.usuarioRepository.save(usuario);
    }
}