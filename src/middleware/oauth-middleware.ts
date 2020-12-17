import { Request, Response, NextFunction } from "express";
import { ErrorResponse, StatusCodes, ErrorCodes, AppException } from "../response/base";
import { PasswordHelper } from "../helpers/passwordhelper";
import { BufferUtits } from "../helpers/buffer-utils";
import { userModel, accessTokenModel } from "../schemas";
import { Types } from "mongoose";

const user_not_found = "Username or Email not found";
const user_is_not_loggedin = "User Is not Logged In";
export interface BaseAuthRequest {
    user?: string;
    username: string;
    password: string;
    client_id: string;
    response_type: string;
    redirect_uri: string;
    state: string;
}

export async function Authentication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payload = req.body as BaseAuthRequest;
        const user = await userModel.findOne({ username : payload.username});
        if (!user) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, user_not_found, "user_not_found");
        if (user && PasswordHelper.compare(req.body.password, user.password)) {
            req.body.user = user;
            next();
        } else {
            AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, "Invalid Password", "invalid_password");
        }
    } catch (err) {
        next(err);
    }
}

/**
 * Used at the time of authorization ( when user is already logged in with another client)
 * @param req - request payload
 * @param res - response handler
 * @param next - next middleware
 */
export async function Authorization(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const body = req.body as BaseAuthRequest;
        const decode = BufferUtits.atob(body.user as string);
        const iamUser = await accessTokenModel.findOne({ user : new Types.ObjectId(decode), refreshTokenExpiresAt: { $gt: new Date() } }).lean() as any;
        if (iamUser) {
            const payload = await userModel.findById(decode as string);
            delete payload.password;
            req.body.user = payload;
            next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED_ACCESS).send(new ErrorResponse(user_is_not_loggedin, ErrorCodes.login_failure));
        }
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED_ACCESS).send(new ErrorResponse(err.message));
    }
}