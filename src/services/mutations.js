import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import api from "configs/api";
import { toast } from "react-toastify";

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);

  return useMutation({ mutationFn });
};

const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);

  return useMutation({ mutationFn });
};

const useAddProduct = (setAddModal) => {
  const queryClient = useQueryClient();
  const mutationFn =(data)=> api.post("products", data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    setAddModal({ show: false, product: null });
      toast.success("محصول با موفقیت افزوده شد!");
  };
  return useMutation({ mutationFn, onSuccess });
};

const deleteProduct = (id) => {
  api.delete(`products/${id}`);
  return useMutation({ mutationFn });
};

const updateProduct = ({ id, ...data }) => api.put(`products/${id}`, data);
const deleteProducts = (ids) => api.delete("/products", { data: { ids } });

export {
  useRegister,
  useLogin,
  useAddProduct,
  deleteProduct,
  updateProduct,
  deleteProducts,
};
