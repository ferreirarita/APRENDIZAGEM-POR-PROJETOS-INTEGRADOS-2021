import { Model } from "objection";
import connection from "../database/connection";
import { projeto as ProjetosType } from "../types/Projeto";
import Usuarios from "./Usuarios";

Model.knex(connection);

interface Projetos extends ProjetosType {}

class Projetos extends Model {
  static get tableName() {
    return "projetos";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "string" },
        status: { type: "string", minLength: 1, maxLength: 255 },
        horas: { type: "float", minLength: 1, maxLength: 255 },
        id_usuario: { type: "string", minLength: 1, maxLength: 255 },
        dataInicio: { type: "string", minLength: 1, maxLength: 255 },
        projetoNome: { type: "string", minLength: 1, maxLength: 255 },
        concluido: { type: "boolean" },
        descricao: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static relationMappings = {
    users: {
      relation: Model.HasOneRelation,
      modelClass: Usuarios,
      join: {
        from: "projetos.id_usuario",
        to: "usuarios.id",
      },
    },
  };
}

export default Projetos;
