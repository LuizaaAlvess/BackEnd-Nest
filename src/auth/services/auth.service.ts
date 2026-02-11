import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { UsuarioLogin } from "../entities/usuariologin.entity";

@Injectable()
export class AuthService {

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {

    const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

    if (!buscaUsuario) {
      throw new HttpException("Usuário não encontrado", HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: usuarioLogin.usuario };

    return {
      id: buscaUsuario.id,
      nome: buscaUsuario.nome,
      usuario: usuarioLogin.usuario,
      senha: "",
      foto: buscaUsuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`
    };
  }
}