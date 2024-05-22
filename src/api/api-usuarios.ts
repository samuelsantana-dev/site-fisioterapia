import axios from "axios";
import { UserEdit } from "./interface";
import { baseUrl, headers, createBody, userTokenDelPutPot } from "./export-padrao";

export async function listarTodosUsuarios() {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/users/all/`,
    { headers: headers }
    );
    console.log(response.data.documents);
    return response.data.documents;
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    throw error;
  }
}

export async function listarUsuariosAdmin() {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/users/all/?admin=true&limit=15`,
    { headers: headers }
    );
    console.log(response.data.documents);
    return response.data.documents;
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    throw error;
  }
}

export async function loginUser(user: any) {
  try {
    const responseLogin = await axios.post(
      `${baseUrl}/api/v1/users/login`,
      createBody(user),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(responseLogin.data);
    return responseLogin.data;
  } catch (error) {
    console.log('Error message:', error);
    throw error;
  }
}

export async function cadastroUsuario(user: any) {
  try {
    const responseCadastro = await axios.post(
      `${baseUrl}/api/v1/users/`,
      createBody(user),
      {
        headers: {
          'Content-Type': 'application/json',
          "x-user-token": userTokenDelPutPot
        },
      }
    );
    console.log(responseCadastro.data);
    return responseCadastro.data;
  } catch (error) {
    console.log('Error message:', error);
    throw error;
  }
}

export async function deletarUsuario(user_id: string) {
  try {
    const response = await axios.delete(`${baseUrl}/api/v1/users/${user_id}`, 
    {
      headers: {
        'Content-Type': 'application/json',
        "x-user-token": userTokenDelPutPot
      },
    }
    );  
    console.log(response.data)
  } catch (error) {
    console.error("Erro ao deletar o usuaário:", error);
  }
}

export async function atualizarUsuario(user: UserEdit) {
  try {
    const response = await axios.put(
      `${baseUrl}/api/v1/users/${user.user_id}`,
      createBody(user),
      {
        headers: {
          'Content-Type': 'application/json',
          "x-user-token": userTokenDelPutPot
        },
      }
  );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    throw error;
  }
}

