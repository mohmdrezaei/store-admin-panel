import api from "configs/api"

const getProducts = (options={})=>{
    
    const {page } =options
   return api.get(`products?page=${page}&limit=10`)
}

export { getProducts}