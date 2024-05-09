import axios from "axios";

const baseUrl = "https://app-jadson-back-wvjk3k2iaq-uc.a.run.app";

export async function getExercicios() {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/exercises/all/`,
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
        console.error('Erro ao obter exercícios API:', error);
    }
}

export async function cadastroExercicioApi(exericios: any){
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/exercises`,
        JSON.stringify(exericios),
      {
        headers: {
            "Content-Type": "application/json",
            "x-user-token": "cc5a0e52c29e81dbe3078fdc"
        }
      }
    )
      console.log(response.data)
      return response.data
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
        "x-user-token": `f2aad5b7c42d773aed1b0844`
      },
    }
    );  
    console.log(response.data)
  } catch (error) {
    console.error("Erro ao deletar o usuaário:", error);
  }
}