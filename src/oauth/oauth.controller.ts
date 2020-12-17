import { Router, Request, Response } from "express";
import {
  Request as OauthRequest,
  Response as OauthResponse,
} from "oauth2-server";
import { parse } from "url";
import { OauthImpl } from "./oauth.model";
import { oauth } from "./oauth.config";
import {
  SuccessResponse,
  ErrorResponse,
  StatusCodes,
  ErrorCodes,
} from "../response/base";
import { TokenHelper } from "../helpers/tokenhelper";
import { BufferUtits } from "../helpers/buffer-utils";
import { AuthValidator } from "../helpers/validator";
import { Authentication, Authorization } from "../middleware/oauth-middleware";

const OauthController = Router();

const handleError = (
  err: any,
  req: Request,
  res: Response,
  response: OauthResponse
): void => {
  const innerError = err.inner;
  if (response) res.set(response.headers);
  res.status(
    innerError && innerError.statusCode ? innerError.statusCode : err.code
  );
  res.send(
    new ErrorResponse(
      err.message,
      innerError && innerError.errorCode ? innerError.errorCode : null
    )
  );
};

export const authHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const rq = new OauthRequest(req);
  const rs = new OauthResponse(res);
  try {
    const data = await oauth.authorize(rq, rs);
    let { location } = rs.headers;
    if (location.includes("#")) {
      const parser = parse(location);
      location = `${parser.protocol}//${parser.host}/${parser.hash}?${parser.query}`;
    }
    res.set(rs.headers);
    delete rs.headers.location;
    delete data._id;
    res.send(
      new SuccessResponse({
        redirect_uri: location,
        user: BufferUtits.btoa(data.user.toString()),
        client: BufferUtits.btoa(data.client.toString()),
        authorizationCode: data.authorizationCode,
        scope: data.scope,
      })
    );
  } catch (err) {
    handleError(err, req, res, rs);
  }
};

export const tokenHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const rq = new OauthRequest(req);
  const rs = new OauthResponse(res);

  return oauth
    .token(rq, rs)
    .then(() => {
      res.set(rs.headers);
      res.status(rs.status).send(rs.body);
    })
    .catch((err) => {
      handleError(err, req, res, rs);
    });
};

export const logoutHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED_ACCESS)
      .send(
        new ErrorResponse(
          "Access Token Not Found",
          ErrorCodes.access_token_missing
        )
      );
  } else {
    const user = TokenHelper.decodeToken(token) as any;
    await OauthImpl.logout(user._id, user.scope);
    res.status(200).send(new SuccessResponse());
  }
};

OauthController.get("/logout", logoutHandler);
OauthController.post(
  "/authenticate",
  AuthValidator.login(),
  Authentication,
  authHandler
);
OauthController.post("/authorize", Authorization, authHandler);
OauthController.post("/token", tokenHandler);

export default OauthController;
