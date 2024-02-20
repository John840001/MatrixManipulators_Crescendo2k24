import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  brand: yup.string().required("Brand is Required"),
  costPrice: yup.number().required("Cost Price is Required"),
  sellingPrice: yup.number().required("Selling Price is Required"),
  purchasedDate: yup.date().required("Purchased Date is Required"),
  purchasedSeason: yup.string().required("Purchased Season is Required"),
  availQuantity: yup.number().required("Avail Quantity is Required"),
  ratings: yup.number().required("Ratings is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  console.log(color);
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const newProduct = useSelector((state) => state.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productName,
    productBrand,
    productCostPrice,
    productSellingPrice,
    productPurchasedDate,
    productPurchasedSeason,
    productAvailQuantity,
    productRatings,
  } = newProduct;

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfullly!");
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      name: productName,
      brand: productBrand,
      costPrice: productCostPrice,
      sellingPrice: productSellingPrice,
      purchasedDate: productPurchasedDate,
      purchasedSeason: productPurchasedSeason,
      availQuantity: productAvailQuantity,
      ratings: productRatings,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Cost Price"
            name="costPrice"
            onChng={formik.handleChange("costPrice")}
            onBlr={formik.handleBlur("costPrice")}
            val={formik.values.costPrice}
          />
          <div className="error">
            {formik.touched.costPrice && formik.errors.costPrice}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Selling Price"
            name="sellingPrice"
            onChng={formik.handleChange("sellingPrice")}
            onBlr={formik.handleBlur("sellingPrice")}
            val={formik.values.sellingPrice}
          />
          <div className="error">
            {formik.touched.sellingPrice && formik.errors.sellingPrice}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.name}>
                  {i.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            name="purchasedSeason"
            onChange={formik.handleChange("purchasedSeason")}
            onBlur={formik.handleBlur("purchasedSeason")}
            value={formik.values.purchasedSeason}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Season of Purchase
            </option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="rainy">Rainy</option>
            <option value="traditional">Teaditional</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Cost Price"
            name="costPrice"
            onChng={formik.handleChange("costPrice")}
            onBlr={formik.handleBlur("costPrice")}
            val={formik.values.costPrice}
          />
          <div className="error">
            {formik.touched.costPrice && formik.errors.costPrice}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Selling Price"
            name="sellingPrice"
            onChng={formik.handleChange("sellingPrice")}
            onBlr={formik.handleBlur("sellingPrice")}
            val={formik.values.sellingPrice}
          />
          <div className="error">
            {formik.touched.sellingPrice && formik.errors.sellingPrice}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.name}>
                  {i.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <CustomInput
            type="date"
            label="Enter Product Purchased Date"
            name="purchasedDate"
            onChng={formik.handleChange("purchasedDate")}
            onBlr={formik.handleBlur("purchasedDate")}
            val={formik.values.purchasedDate}
          />
          <div className="error">
            {formik.touched.purchasedDate && formik.errors.purchasedDate}
          </div>

          <CustomInput
            type="number"
            label="Enter Product's Available Quantity"
            name="availQuantity"
            onChng={formik.handleChange("availQuantity")}
            onBlr={formik.handleBlur("availQuantity")}
            val={formik.values.availQuantity}
          />
          <div className="error">
            {formik.touched.availQuantity && formik.errors.availQuantity}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
