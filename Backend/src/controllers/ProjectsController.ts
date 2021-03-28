import { Request, Response } from "express";
import Projetos from "../models/Projetos";

class ProjectsController {
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const project = await Projetos.query().where("id", id).first();

    return response.status(200).send(project);
  }
}

export default ProjectsController;
