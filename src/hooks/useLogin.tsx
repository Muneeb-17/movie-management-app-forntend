import { useMutation } from 'react-query';
import axios from 'axios';

// Define the login function
const login = async (credentials: any) => {
  console.log({credentials});
  
  const response = await axios.post('/login', credentials); // Adjust the endpoint as needed
  return response.data;
};

// Create a custom hook for login
export const useLogin = () => {
  return useMutation(login);
};