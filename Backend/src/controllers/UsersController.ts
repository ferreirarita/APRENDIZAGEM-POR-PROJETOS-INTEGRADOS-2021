import { Request, Response } from "express";
import Usuarios from "../models/Usuarios";

class UsersController {
  async index(request: Request, response: Response) {
    const users = await Usuarios.query().select("*");

    return response.status(200).send(users);
  }
}

export default UsersController;
