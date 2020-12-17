import { hashSync, compareSync } from "bcrypt";

import { generate } from "generate-password";
import { ConfigEnv } from "./config";

export class PasswordHelper {
    /**
     * Used to encrypt password
     * @param text - text password
     */
    public static encrypt(text: string): string {
        return hashSync(text, ConfigEnv.get('SALT'));
    }

    /**
     * compare hash and text password
     * @param text - text passowrd
     * @param hash - hash
     */
    public static compare(text: string, hash: string): boolean {
        return compareSync(text, hash);
    }

    /**
     * used to create random password if needed
     */
    public static createPassword(): string {
        return generate({
            uppercase: false,
            length: 10,
            excludeSimilarCharacters: true,
            symbols: false,
            numbers: true,
        });
    }
}