import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
    private userService = new UserService();

    createUser = async (req: Request, res: Response) => {
        try{
            const result = await this.userService.createUser(req.body);
            res.status(201).json(result);
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try{
            const result = await this.userService.getAllUsers();
            res.status(200).json(result);
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try{
            const user_id = parseInt(req.params.user_id);
            const result = await this.userService.getUserById(user_id);
            res.status(201).json(result);
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    
    updateUser = async (req: Request, res: Response) => {
        try{
            const user_id = parseInt(req.params.user_id);
            const result = await this.userService.updateUser(user_id, req.body);
            res.status(200).json(result);
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try{
            const user_id = parseInt(req.params.user_id);
            await this.userService.deleteUser(user_id);
            res.status(204).send("User deleted successfully");
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    

}