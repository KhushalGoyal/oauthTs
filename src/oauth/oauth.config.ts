import OAuth2Server from 'oauth2-server';
import { OauthImpl } from "./oauth.model";
import { ConfigEnv } from '../helpers/config';


export const oauth = new OAuth2Server({
    model: OauthImpl as any,
    allowEmptyState: true,
    authorizationCodeLifetime: ConfigEnv.get('AUTHORIZATION_CODE_LIFE_TIME') as any as number,
    authenticateHandler: { handle: (reqs: any): any => reqs.body.user },
    accessTokenLifetime: ConfigEnv.get('ACCESS_TOKEN_LIFE_TIME') as any as number,
    refreshTokenLifetime: ConfigEnv.get('REFRESH_TOKEN_LIFE_TIME') as any as number,
    requireClientAuthentication: { authorization_code: true, refresh_token: true },
});