import { Request, Response } from "express";
import Usuarios from "../models/Usuarios";
import { usuario } from "../types/Usuarios";

class UsersController {
  async index(request: Request, response: Response) {
    const users: usuario[] = await Usuarios.query().select("*");

    users.forEach((user: any) => {
      delete user.senha;
    });

    return response.send({ users });
  }
}

export default UsersController;
