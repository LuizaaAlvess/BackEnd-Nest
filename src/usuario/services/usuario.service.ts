import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario> {

    const usuarioEncontrado = await this.usuarioRepository.findOne({
      where: { usuario: usuario }
    });

    if (!usuarioEncontrado) {
      throw new HttpException(
        "Usuário não encontrado!",
        HttpStatus.NOT_FOUND
      );
    }

    return usuarioEncontrado;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {

    const usuario = await this.usuarioRepository.findOne({
      where: { id }
    });

    if (!usuario) {
      throw new HttpException(
        "Usuário não encontrado!",
        HttpStatus.NOT_FOUND
      );
    }

    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {

    const buscaUsuario = await this.usuarioRepository.findOne({
      where: { usuario: usuario.usuario }
    });

    if (buscaUsuario) {
      throw new HttpException(
        "Usuário já existe!",
        HttpStatus.BAD_REQUEST
      );
    }

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {

    const usuarioExistente = await this.findById(usuario.id);

    if (!usuarioExistente) {
      throw new HttpException(
        "Usuário não encontrado!",
        HttpStatus.NOT_FOUND
      );
    }

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return this.usuarioRepository.save(usuario);
  }
}