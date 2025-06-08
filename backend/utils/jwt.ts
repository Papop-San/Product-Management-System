import jwt from 'jsonwebtoken';

export class JwtUtil {
    private accessSecret = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
    private refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';


    generateAccessToken(payload: object): string {
        return jwt.sign(payload, this.accessSecret, { expiresIn: '15m' });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, this.refreshSecret, { expiresIn: '7d' });
    }

    verifyAccessToken(token: string): any {
        return jwt.verify(token, this.accessSecret);
    }

    verifyRefreshToken(token: string): any {
        return jwt.verify(token, this.refreshSecret);
    }
}
