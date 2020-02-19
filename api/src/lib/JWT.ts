import * as jwt from 'jwt-simple';
import * as moment from 'moment-timezone';

export interface IJWTConfig {
    secret: string;
}
export class JWTOKEN {
    protected exp: moment.MomentInputObject = { day: 1 };
    protected secret: string;
    
    constructor(config: IJWTConfig) {
        this.secret = config.secret;
    }
    
    /**
     * Checks if the user is authorized
     */
    public createToken(sub: any): string {
        return jwt.encode({
            exp: moment().add(this.exp).unix(),
            iat: moment().unix(),
            sub,
        }, this.secret);
    }
    
    /**
     * Checks if the user is authorized
     */
    public isAuthorized(token: string): Promise<any> {
        try {
            return Promise.resolve(this.isValidToken(token));
        } catch (err) {
            return Promise.reject(err);
        }
    }
    
    /**
     * Checks if the token is valid
     */
    protected isValidToken(token: string): any {
        return jwt.decode(token, this.secret).sub;
    }
}
