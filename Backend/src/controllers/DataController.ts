import { Request, Response } from "express";
import Projetos from "../models/Projetos";
import Jira from "../../mocks/data/jira";
import Trello from "../../mocks/data/trello";
import { projeto } from "../types/Projeto";
import Usuarios from "../models/Usuarios";
import { usuario } from "../types/Usuarios";
import { removeDeplicated } from "../helpers/RemoveDuplicated";
import knex from "../database/connection";
import { ExportToCsv } from "export-to-csv";
import fs from "fs";

class DataController {
  async joinData(request: Request, response: Response) {
    let jiraUsers: usuario[] = [];
    let trelloUsers: usuario[] = [];
    let jiraProjects: projeto[] = [];
    let trelloProjects: projeto[] = [];

    Jira.forEach(async (dado: any) => {
      let myUser: usuario = {
        id: "",
        imagem: "",
        nome: "",
        sobrenome: "",
        email: "",
      };

      let myProjects: projeto = {
        id: "",
        status: "",
        horas: 0,
        id_usuario: "",
        dataInicio: "",
        projetoNome: "",
        concluido: false,
        descricao: "",
      };

      myUser.id = dado.user.id;
      myUser.imagem = dado.user.avatar;
      myUser.nome = dado.user.first_name;
      myUser.sobrenome = dado.user.last_name;
      myUser.email = dado.user.email;

      myProjects.id = dado.id;
      myProjects.status = dado.status;
      myProjects.horas = dado.amountHours || 0;
      myProjects.dataInicio = dado.startedAt;
      myProjects.projetoNome = dado.project;
      myProjects.concluido = dado.finished ? true : false;
      myProjects.descricao = dado.cardDescription;

      myProjects.id_usuario = dado.user.id;

      jiraUsers = [...jiraUsers, myUser];
      jiraProjects = [...jiraProjects, myProjects];
      await Projetos.query().insert(myProjects);
    });

    Trello.forEach(async (dado: any) => {
      let myUser: usuario = {
        id: "",
        imagem: "",
        nome: "",
        sobrenome: "",
        email: "",
      };

      let myProjects: projeto = {
        id: "",
        status: "",
        horas: 0,
        id_usuario: "",
        dataInicio: "",
        projetoNome: "",
        concluido: false,
        descricao: "",
      };

      myProjects.id = dado._id;
      myProjects.status = dado.status;
      myProjects.horas = dado.hours || 0;

      myProjects.dataInicio = dado.startedAt;
      myProjects.projetoNome = dado.project;
      myProjects.concluido = dado.isFinished ? true : false;
      myProjects.descricao = dado.cardDescription;

      myUser.id = dado.user._id;
      myUser.imagem = dado.user.avatar;
      myUser.nome = dado.user.userName;
      myUser.sobrenome = dado.user.userLastName;
      myUser.email = dado.user.userEmail;

      myProjects.id_usuario = dado.user._id;

      trelloUsers = [...trelloUsers, myUser];
      trelloProjects = [...trelloProjects, myProjects];
      await Projetos.query().insert(myProjects);
    });

    const allUsers = trelloUsers.concat(jiraUsers);
    const formatedUsers = await removeDeplicated(allUsers);

    formatedUsers.forEach(async (user: usuario) => {
      await Usuarios.query().insert(user);
    });

    return response.status(201).send(jiraProjects.concat(trelloProjects));
  }

  async listar(request: Request, response: Response) {
    const { page } = request.params;

    const myPage: number = parseInt(page);
    const [count] = await knex("projetos").count();
    const data = await knex("projetos")
      .join("usuarios", "usuarios.id", "projetos.id_usuario")
      .select(
        "projetos.id",
        "projetos.status",
        "projetos.horas",
        "projetos.dataInicio",
        "projetos.projetoNome",
        "projetos.concluido",
        "projetos.descricao",
        "projetos.id_usuario",
        "usuarios.nome",
        "usuarios.imagem",
        "usuarios.email",
        "usuarios.sobrenome"
      )
      .limit(50)
      .offset((myPage - 1) * 5);

    return response.status(200).json({ total: count, data: data });
  }

  async exportData(request: Request, res: Response) {
    const options = {
      fieldSeparator: "|",
      quoteStrings: "",
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Dados GSW",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: [
        "Id do projeto",
        "Status do projeto",
        "Horas trabalhadas",
        "Data de início",
        "Nome do projeto",
        "Status de conlusão",
        "Descrição do projeto",
        "Id do colaborador",
        "Nome do colaborador",
        "URL da imagem",
        "Email do colaborador",
        "Sobrenome do colaborador",
      ],
    };

    const data = await knex("projetos")
      .join("usuarios", "usuarios.id", "projetos.id_usuario")
      .select(
        "projetos.id",
        "projetos.status",
        "projetos.horas",
        "projetos.dataInicio",
        "projetos.projetoNome",
        "projetos.concluido",
        "projetos.descricao",
        "projetos.id_usuario",
        "usuarios.nome",
        "usuarios.imagem",
        "usuarios.email",
        "usuarios.sobrenome"
      );

    const csvExporter = new ExportToCsv(options);
    const csvData = csvExporter.generateCsv(data, true);
    const fileName = `data-${Math.random()}.csv`;
    const file = `./tmp/${fileName}`;
    fs.writeFileSync(`./tmp/${fileName}`, csvData);

    return res.download(file);
  }
}

export default DataController;
