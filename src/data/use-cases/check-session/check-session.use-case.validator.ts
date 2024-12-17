import { BaseValidator } from '@src/data/protocols/validators/base.validator';
import { z } from 'zod';
import { ICheckSessionUseCase } from './check-session.use-case.dto';

export class CheckSessionCaseValidator extends BaseValidator<
  Partial<ICheckSessionUseCase.InputSession>
> {
  protected schema = z.object({
    token: z.string(),
  });
}
