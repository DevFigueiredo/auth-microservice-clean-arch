import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckSessionUseCase } from '@src/data/use-cases/check-session/check-session.use-case';
import { ICheckSessionUseCase } from '@src/data/use-cases/check-session/check-session.use-case.dto';
import { AuthGuard } from '../decorators/auth.decorator';

@Controller()
@ApiTags('Authentication')
export class CheckSessionController {
  constructor(
    @Inject(CheckSessionUseCase)
    private readonly checkSessionUseCase: ICheckSessionUseCase,
  ) {}

  @AuthGuard()
  @Post('/check-session')
  @ApiResponse({ type: ICheckSessionUseCase.OutputSession })
  @HttpCode(HttpStatus.OK)
  async checkSession(
    @Headers() headers: Record<string, string>,
  ): Promise<ICheckSessionUseCase.OutputSession> {
    const [_, token] = headers['authorization'].split(' ');

    return this.checkSessionUseCase.execute({ token });
  }
}
