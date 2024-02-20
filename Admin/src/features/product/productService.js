import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      name: product.productData.name,
      brand: product.productData.brand,
      costPrice: product.productData.costPrice,
      sellingPrice: product.productData.sellingPrice,
      purchasedDate: product.productData.purchasedDate,
      purchasedSeason: product.productData.purchasedSeason,
      availQuantity: product.productData.availQuantity,
      ratings: product.productData.ratings,
    },
    config
  );

  return response.data;
};

const deleteproduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteproduct,
  updateProduct,
  getProduct,
};

export default productService;
