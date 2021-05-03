import { Request, Response } from "express";
import Projetos from "../models/Projetos";
import Jira from "../../mocks/data/jira";
import Trello from "../../mocks/data/trello";
import { projeto } from "../types/Projeto";
import { removeDeplicatedProject } from "../helpers/RemoveDuplicatedProject";
import Usuarios from "../models/Usuarios";
import { usuario } from "../types/Usuarios";
import { removeDeplicated } from "../helpers/RemoveDuplicated";
import generateHash from "../helpers/generateHash";

class ProjectDataController {
  async storeProject(request: Request, response: Response) {
    let projects: any[] = [];

    Jira.forEach((data: any) => {
      let project: { projetoNome: string } = { projetoNome: "" };

      project.projetoNome = data.project;

      projects = [...projects, project];
    });

    Trello.forEach((data: any) => {
      let project: { projetoNome: string } = { projetoNome: "" };

      project.projetoNome = data.project;

      projects = [...projects, project];
    });

    const finalProjects = await removeDeplicatedProject(projects);

    let projectsArray: projeto[] = [];
    for (let i = 0; i < finalProjects.length; i++) {
      projectsArray = [...projectsArray, finalProjects[i]];
      await Projetos.query().insert(projectsArray[i]);
    }

    return response.status(201).send(projectsArray);
  }

  async storeUsers(request: Request, response: Response) {
    let users: usuario[] = [];

    Jira.forEach((dado: any) => {
      let myUser: usuario = {
        id: "",
        imagem: "",
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      };

      myUser.id = dado.user.id;
      myUser.imagem = dado.user.avatar;
      myUser.nome = dado.user.first_name;
      myUser.sobrenome = dado.user.last_name;
      myUser.email = dado.user.email;
      myUser.senha = generateHash();

      users = [...users, myUser];
    });

    Trello.forEach((dado: any) => {
      let myUser: usuario = {
        id: "",
        imagem: "",
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      };

      myUser.id = dado.user._id;
      myUser.imagem = dado.user.avatar;
      myUser.nome = dado.user.userName;
      myUser.sobrenome = dado.user.userLastName;
      myUser.email = dado.user.userEmail;
      myUser.senha = generateHash();

      users = [...users, myUser];
    });

    const finalUsers = await removeDeplicated(users);

    for (let i = 0; i < finalUsers.length; i++) {
      await Usuarios.query().insert(finalUsers[i]);
    }

    return response.send(finalUsers);
  }
}

export default ProjectDataController;
