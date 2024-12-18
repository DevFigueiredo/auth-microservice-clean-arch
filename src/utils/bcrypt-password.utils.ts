import { Injectable } from '@nestjs/common';
import { IPasswordUtils } from '@src/data/protocols/utils/password.util';
import bcrypt from 'bcrypt';

@Injectable()
export class BCryptPassword implements IPasswordUtils {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
