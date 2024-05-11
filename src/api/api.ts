import axios from "axios";

const baseUrl = "https://app-jadson-back-wvjk3k2iaq-uc.a.run.app";

export async function listarTodosUsuarios() {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/users/all/`,
    {
      headers: {
        'Content-Type': 'application/json',
        "x-user-token": "ae572c421ee598d434bc8e7c"
      },
    }
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
    {
      headers: {
        'Content-Type': 'application/json',
        "x-user-token": "ae572c421ee598d434bc8e7c"
      },
    }
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
      JSON.stringify(user),
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
      JSON.stringify(user),
      {
        headers: {
          'Content-Type': 'application/json',
          "x-user-token": "f2aad5b7c42d773aed1b0844"
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
        "x-user-token": `${user_id}`
      },
    }
    );  
    console.log(response.data)
  } catch (error) {
    console.error("Erro ao deletar o usuaário:", error);
  }
}

export async function atualizarUsuario(user_id: string){
  try {
    const response = await axios.put(`${baseUrl}/api/v1/users/${user_id}`, 
    {
      headers: {
        'Content-Type': 'application/json',
        "x-user-token": `f2aad5b7c42d773aed1b0844`
      },
    }
    );  
    console.log(response.data)
  } catch (error) {
    console.error("Erro ao atualizar o usuaário:", error);
  }
}
