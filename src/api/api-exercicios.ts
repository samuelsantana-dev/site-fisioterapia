import axios from "axios";

const baseUrl = "https://app-jadson-back-wvjk3k2iaq-uc.a.run.app";
const userToken = "cc5a0e52c29e81dbe3078fdc";

const headers = {
  'Content-Type': 'application/json',
  'x-user-token': userToken
};

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
        JSON.stringify(exercise_id),
        {
          headers: {
            'Content-Type': 'application/json',
            "x-user-token": `${exercise_id}`
          },
        }
    )
      console.log(response.data)
      return response.data
    } catch (error){
        console.log(error)
    }
}

export async function atualizarExercicio(exercise: any){
  try{
    const response = await axios.put(
      `${baseUrl}/api/v2/exercises/${exercise.id}`,
      JSON.stringify(exercise),
      { headers: headers }
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
      headers: headers,
    }
    );  
    console.log(response.data)
  } catch (error) {
    console.error("Erro ao deletar o usuaário:", error);
  }
}