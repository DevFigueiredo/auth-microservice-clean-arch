import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '@src/infra/db/auth/auth.repository';
import { IAuthRepository } from '@src/data/protocols/repositories/auth/auth.repository.interface';
import { ITokenAdapter } from '@src/data/protocols/adapters/token-adapter.interface';
import { JwtTokenAdapter } from '@src/infra/adapters/token-adapter';
import { ICheckSessionUseCase } from './check-session.use-case.dto';
import { CheckSessionCaseValidator } from './check-session.use-case.validator';

@Injectable()
export class CheckSessionUseCase implements ICheckSessionUseCase {
  constructor(
    @Inject(JwtTokenAdapter) private readonly tokenAdapter: ITokenAdapter,
  ) {}

  async execute(
    data: ICheckSessionUseCase.InputSession,
  ): Promise<ICheckSessionUseCase.OutputSession> {
    new CheckSessionCaseValidator().validate(data);

    const decodedToken =
      this.tokenAdapter.verifyToken<ICheckSessionUseCase.OutputSession>(
        data.token,
      );

    if (!decodedToken) throw new UnauthorizedException('Token invalido');

    return decodedToken;
  }
}
