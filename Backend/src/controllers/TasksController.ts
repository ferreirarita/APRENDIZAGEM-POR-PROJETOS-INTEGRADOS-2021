import { Request, Response } from "express";
import Tarefas from "../models/Tarefas";
import { tarefa } from "../types/Tarefas";

class TasksController {
  async create(request: Request, response: Response) {
    const { horas, id_usuario, dataInicio, id_projeto, concluido, descricao } =
      request.body;

    const data: tarefa = {
      id: "",
      horas,
      id_usuario,
      dataInicio,
      id_projeto,
      concluido,
      descricao,
      status: "IN_PROGRESS",
    };

    try {
      await Tarefas.query().insert(data);

      return response
        .status(201)
        .send({ message: "Inserido com sucesso!", data });
    } catch (error) {
      return response
        .status(error.statusCode)
        .send({ message: "Ocorreu um erro", erro: error });
    }
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;
    const task = await Tarefas.query().select("*").where("id", id).first();

    return response.status(200).json(task);
  }

  async update(request: Request, response: Response) {
    const { status } = request.body;
    const { id } = request.params;

    await Tarefas.query().where("id", id).update({ status });
    const task = await Tarefas.query()
      .select("status", "descricao")
      .where("id", id)
      .first();

    return response.status(200).json({
      message: "Atualizado com sucesso",
      task,
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    await Tarefas.query().delete().where("id", id);

    return response.status(200).json({
      message: "Deletado com sucesso",
    });
  }
}

export default TasksController;
