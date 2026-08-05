import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { supabase } from '../lib/supabase';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // 1. Verifica se o cabeçalho Authorization foi enviado na requisição
    if (!authHeader) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    // 2. Garante o formato 'Bearer <token>'
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato do token inválido.');
    }

    // 3. Valida o JWT diretamente com o Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('Sessão inválida ou expirada.');
    }

    // 4. Anexa o usuário validado na requisição (disponível no req.user do controller caso precise)
    request.user = user;

    return true;
  }
}