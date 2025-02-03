export const handleAxiosError = (error) => {
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // La solicitud se hizo pero no se recibió respuesta
    console.log(error.request);
  } else {
    // Algo sucedió al configurar la solicitud que desencadenó un error
    console.log('Error', error.message);
  }
  console.log(error.config);
};