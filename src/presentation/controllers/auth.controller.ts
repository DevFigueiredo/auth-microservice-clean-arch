import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from '@src/data/use-cases/auth/auth.use-case';
import { IAuthUseCase } from '@src/data/use-cases/auth/auth.use-case.dto';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(
    @Inject(AuthUseCase)
    private readonly authUseCase: IAuthUseCase,
  ) {}

  @Post('/login')
  @ApiBody({ type: IAuthUseCase.InputLogin })
  @ApiResponse({ type: IAuthUseCase.OutputLogin })
  async login(
    @Body() payload: IAuthUseCase.InputLogin,
  ): Promise<IAuthUseCase.OutputLogin> {
    return this.authUseCase.execute(payload);
  }
}
