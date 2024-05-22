import axios from "axios";
import { baseUrl, createBody, headers, userTokenDelPutPot } from "./export-padrao";
import { Exercise, UserEdit } from "./interface";


export async function getExercicios() {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/exercises/all/`,
        {
          headers: headers,
        }
        );
        console.log(response.data.documents);
        return response.data.documents;
    } catch (error) {
        console.error('Erro ao obter exercícios API:', error);
    }
}

export async function cadastroExercicioApi(exercise_id: any){
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/exercises`,
       createBody(exercise_id),
        {
          headers
        }
    )
      console.log(response.data)
      return response.data
    } catch (error){
        console.log(error)
    }
}

export async function atualizarExercicio(exercise: Exercise){
  try{
    const response = await axios.put(
      `${baseUrl}/api/v1/exercises/${exercise.exercise_id}`,
     createBody(exercise),
     {
      headers: {
        'Content-Type': 'application/json',
        "x-user-token": userTokenDelPutPot
      },
    }
    )
    console.log('response', response.data)
  } catch (error){
    console.log(error)
  }
}

export async function deletarExercicio(exercise_id: string) {
  try {
    const response = await axios.delete(`${baseUrl}/api/v1/exercises/${exercise_id}`, 
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