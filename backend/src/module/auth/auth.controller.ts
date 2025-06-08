import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private authService = new AuthService();

  registerUser = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.registerUser(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.loginUser(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const token = req.body.refresh_token;
      const result = await this.authService.refreshAccessTokenDirectJwt(token);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };

  logoutUser = async (req: Request, res: Response) => {
    try {
      const user_id = req.body.user_id;
      await this.authService.logoutUser(user_id);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
