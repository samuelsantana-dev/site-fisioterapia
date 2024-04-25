import axios from "axios";

const baseUrl = "https://app-jadson-back-wvjk3k2iaq-uc.a.run.app";

export const listarTodosUsuarios = async () => {
    const url = `${baseUrl}/api/v1/users/all/`
  
    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "x-user-token": "ae572c421ee598d434bc8e7c",
          },
        }
      )
  
      const data = await response.json()
      console.log(data)
      return data;
    } catch (e) {
      console.error(e)
      throw e;
    } 
  }

export async function cadastroUsuario(){
    const usuarioData = 
        {
              "name": "",
              "birth": "",
              "email": "",
              "phone": "",
              "gender": "",
              "admin": false, //vefiricar no banco se é admin
              "profile_pic": "",
              "diagnosis": "",
              "exercise_list": [
                ""
              ], //lista de exercicios
              "signed_eula": false, //verificar assinatura
              "password": ""
            
    }

    const response = await axios.post("https://app-jadson-back-wvjk3k2iaq-uc.a.run.app/api/v1/users/")

    return response.data;
}