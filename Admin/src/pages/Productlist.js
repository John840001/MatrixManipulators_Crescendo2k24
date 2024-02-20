import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { delImg } from "../features/upload/uploadSlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "Product ID",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Cost Price",
    dataIndex: "costPrice",
  },
  {
    title: "Selling Price",
    dataIndex: "sellingPrice",
  },
  {
    title: "Purchased Date",
    dataIndex: "purchasedDate",
  },
  {
    title: "Purchased Season",
    dataIndex: "purchasedSeason",
  },
  {
    title: "Available Quantity",
    dataIndex: "availQuantity",
  },
  {
    title: "Ratings",
    dataIndex: "ratings",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state?.product?.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: 999 + 1 + i,
      name: productState[i].name,
      brand: productState[i].brand,
      costPrice: productState[i].costPrice,
      sellingPrice: productState[i].sellingPrice,
      purchasedDate: productState[i].purchasedDate,
      purchasedSeason: productState[i].purchasedSeason,
      availQuantity: productState[i].availQuantity,
      ratings: productState[i].ratings,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-success"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    dispatch(delImg(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
