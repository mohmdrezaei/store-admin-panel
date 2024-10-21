import api from "configs/api"

const getProducts = ()=> api.get("products")

export { getProducts}