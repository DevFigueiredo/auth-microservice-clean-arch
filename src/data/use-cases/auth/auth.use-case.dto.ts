import { ApiProperty } from '@nestjs/swagger';

export interface IAuthUseCase {
  execute(data: IAuthUseCase.InputLogin): Promise<IAuthUseCase.OutputLogin>;
}

export namespace IAuthUseCase {
  export class InputLogin {
    @ApiProperty({
      example: 'admin@admin.com.br',
    })
    email: string;
    @ApiProperty({
      example: 'adminPassword123',
    })
    password: string;
  }
  export class OutputLogin {
    @ApiProperty()
    token: string;
  }
}
