import { body, ValidationChain } from "express-validator";

export class AuthValidator {
    static login(): ValidationChain[] {
        return [
            body("username").notEmpty().withMessage("Email is required").isEmail()
                .withMessage("Invalid Email"),
            body("password").notEmpty().withMessage("Password is empty"),
        ];
    }
}