import { sign, verify, decode, SignOptions, VerifyOptions } from 'jsonwebtoken';

const sceretKey = 'jijaijyFTATyagsyg76767hashda8dans'

export class TokenHelper {
    public static generateToken(payload : any, config? : SignOptions ) {
        return sign(payload, sceretKey, config)
    } 

    public static verifyToken<T>(token: string, verifyOptions?: VerifyOptions){
        return verify(token, sceretKey, verifyOptions) as any as T;
    }

    public static decodeToken<T>(token: string){
        return decode(token) as T;
    }
}