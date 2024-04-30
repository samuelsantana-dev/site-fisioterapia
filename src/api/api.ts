import axios from "axios";

const baseUrl = "https://app-jadson-back-wvjk3k2iaq-uc.a.run.app";

export async function listarTodosUsuarios() {
  try {
    const response = await axios.get("https://app-jadson-back-wvjk3k2iaq-uc.a.run.app/api/v1/users/all/", {
      headers: {
        "x-user-token": "ae572c421ee598d434bc8e7c"
      }
    });
    // console.log(response.data.documents);
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

// export async function cadastroUsuario() {
//   try {
//     const response = await axios.post("https://app-jadson-back-wvjk3k2iaq-uc.a.run.app/api/v1/users/ ", {
//       headers: {
//         "x-user-token": "ae572c421ee598d434bc8e7c"
//       }
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
