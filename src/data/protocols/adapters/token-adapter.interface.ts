export interface ITokenAdapter {
  generateToken(payload: object, expiresIn?: string | number): string;
  verifyToken<T>(token: string): T | null;
}
