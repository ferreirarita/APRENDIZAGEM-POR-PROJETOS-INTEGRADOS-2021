import { Request, Response } from "express";
import knex from "../database/connection";
import { ExportToCsv } from "export-to-csv";
import fs from "fs";
import Projetos from "../models/Projetos";
import Usuarios from "../models/Usuarios";

const getDataByUserId = async (projectId: any, userId: string) => {
  const data = await knex("tarefas")
    .join("usuarios", "usuarios.id", "tarefas.id_usuario")
    .select(
      "tarefas.id",
      "tarefas.concluido",
      "tarefas.status",
      "tarefas.descricao",
      "tarefas.horas"
    )

    .where("id_projeto", projectId)
    .where("id_usuario", userId);

  const projeto = await Projetos.query()
    .select("*")
    .where("id", projectId)
    .first();

  const tasks = {
    project: projeto.projetoNome,
    tasks: data,
  };

  return tasks;
};

const getAllData = async (projectId: any) => {
  const data = await knex("tarefas")
    .join("usuarios", "usuarios.id", "tarefas.id_usuario")
    .select(
      "tarefas.id",
      "tarefas.concluido",
      "tarefas.status",
      "tarefas.descricao",
      "tarefas.horas"
    )

    .where("id_projeto", projectId);

  const projeto = await Projetos.query()
    .select("*")
    .where("id", projectId)
    .first();

  const tasks = {
    project: projeto.projetoNome,
    tasks: data,
  };

  return tasks;
};

class DataController {
  async listar(request: Request, response: Response) {
    const userId = response.locals.tokenData.id;
    const projectId = request.headers.projectid || "";
    const user = await Usuarios.query().select("*").where("id", userId).first();

    if (user.id_role === "0") {
      if (userId && projectId) {
        const tasks = await getDataByUserId(projectId, userId);

        return response.status(200).json(tasks);
      } else {
        return response.status(404).json({
          message: "Necessário informar projeto.",
        });
      }
    } else {
      if (userId && projectId) {
        const tasks = await getAllData(projectId);
        return response.status(200).json(tasks);
      } else {
        return response.status(404).json({
          message: "Necessário informar projeto.",
        });
      }
    }
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
