export const baseUrl = "https://app-jadson-back-wvjk3k2iaq-uc.a.run.app";

// LISTAR o token
export const userToken = window.localStorage.getItem("user_token");

//Cabeçalho de cada requisição
export const headers = {
  'Content-Type': 'application/json',
  'x-user-token': userToken
};

//converte para JSON
export const createBody = (value: any) => JSON.stringify(value);

