import { useMutation } from "@tanstack/react-query";
import api from "configs/api";

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);

  return useMutation({ mutationFn });
};

const useLogin = () => {
    const mutationFn = (data) => api.post("auth/login", data);
  
    return useMutation({ mutationFn });
  };

  const addProduct = data => api.post("products" , data)

  const deleteProduct = id => api.delete(`products/${id}`)
   

export { useRegister , useLogin , addProduct ,deleteProduct};
