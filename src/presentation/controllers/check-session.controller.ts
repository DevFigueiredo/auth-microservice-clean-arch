import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckSessionUseCase } from '@src/data/use-cases/check-session/check-session.use-case';
import { ICheckSessionUseCase } from '@src/data/use-cases/check-session/check-session.use-case.dto';

@Controller()
@ApiTags('Authentication')
export class CheckSessionController {
  constructor(
    @Inject(CheckSessionUseCase)
    private readonly checkSessionUseCase: ICheckSessionUseCase,
  ) {}

  @Post('/check-session')
  @ApiBody({ type: ICheckSessionUseCase.InputSession })
  @ApiResponse({ type: ICheckSessionUseCase.OutputSession })
  async checkSession(
    @Body() payload: ICheckSessionUseCase.InputSession,
  ): Promise<ICheckSessionUseCase.OutputSession> {
    return this.checkSessionUseCase.execute(payload);
  }
}
