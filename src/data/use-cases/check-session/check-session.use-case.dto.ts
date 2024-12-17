import { ApiProperty } from '@nestjs/swagger';

export interface ICheckSessionUseCase {
  execute(
    data: ICheckSessionUseCase.InputSession,
  ): Promise<ICheckSessionUseCase.OutputSession>;
}

export namespace ICheckSessionUseCase {
  export class InputSession {
    @ApiProperty()
    token: string;
  }
  export class OutputSession {
    @ApiProperty()
    id: number;
    @ApiProperty()
    iat: number;
    @ApiProperty()
    exp: number;
  }
}
