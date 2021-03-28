import { Model } from "objection";
import connection from "../database/connection";
import { usuario as UsuariosType } from "../types/Usuarios";

Model.knex(connection);

interface Usuarios extends UsuariosType {}

class Usuarios extends Model {
  static get tableName() {
    return "usuarios";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "string" },
        status: { type: "string", minLength: 1, maxLength: 255 },
        imagem: { type: "string", minLength: 1, maxLength: 255 },
        nome: { type: "string", minLength: 1, maxLength: 255 },
        sobrenome: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default Usuarios;
