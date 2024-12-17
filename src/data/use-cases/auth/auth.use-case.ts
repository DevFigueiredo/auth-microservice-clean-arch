import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthUseCase } from './auth.use-case.dto';
import { AuthUseCaseValidator } from './auth.use-case.validator';
import { AuthRepository } from '@src/infra/db/auth/auth.repository';
import { IAuthRepository } from '@src/data/protocols/repositories/auth/auth.repository.interface';
import { ITokenAdapter } from '@src/data/protocols/adapters/token-adapter.interface';
import { JwtTokenAdapter } from '@src/infra/adapters/token-adapter';

@Injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(
    @Inject(AuthRepository) private readonly authRepository: IAuthRepository,
    @Inject(JwtTokenAdapter) private readonly tokenAdapter: ITokenAdapter,
  ) {}

  async execute(
    data: IAuthUseCase.InputLogin,
  ): Promise<IAuthUseCase.OutputLogin> {
    new AuthUseCaseValidator().validate(data);
    const user = await this.authRepository.login({
      email: data.email,
      password: data.password,
    });

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválida');
    }
    const expiresIn = 3600; // 1 hora;
    const token = this.tokenAdapter.generateToken(
      {
        id: user.id,
      },
      expiresIn,
    );
    return { token: token };
  }
}
