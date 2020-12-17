import { SignOptions, VerifyOptions } from "jsonwebtoken";
export declare class TokenHelper {
  static generateToken(payload: any, config?: SignOptions): string;
  static verifyToken<T>(token: string, verifyOptions?: VerifyOptions): T;
  static decodeToken<T>(token: string): T;
}
