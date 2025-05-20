import { useEffect, useState } from "react";

import dayjs from "dayjs";
import img from "../../assets/p1.jpg";
import AddModal from "../../components/AddModal";
import UpdateModal from "../../components/UpdateModal";
import DeleteModal from "../../components/DeleteModal";
import ProductsCard from "../../components/ProductsCard";
// import ProductsHeader from "../../components/ProductsHeader";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: " ",
    brand: "",
    category: "",
    desc: "",
    quantity: "",
    buy_price: "",
    selling_price: "",
    expire_date: "",
    come_date: "",
    createdAt: "",
    updatedAt: "",
  });
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCT", payload: json });
      }
    };

    if (user) {
      fetchProducts();
      console.log(user);
    }
  }, [dispatch, user]);

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = dayjs();
    const expiry = dayjs(expiryDate);
    return expiry.diff(today, "day") <= 30;
  };
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = dayjs();
    return dayjs(expiryDate).isBefore(today, "day");
  };
  const getStockLabel = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return null;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleEditClick = (product) => {
    setProductToUpdate(product);
    setUpdateModal(true);
  };

  return (
    <div className="min-h-screen p-0 bg-gradient-to-br from-gray-200 to-white-200 ">
      <div className="w-full mx-auto">
        <Navbar />
        <Sidebar />
        <main className="pt-16 md:pl-64 min-h-screen bg-gray-50">
          <ProductsCard
            filteredProducts={filteredProducts}
            isExpiringSoon={isExpiringSoon}
            isExpired={isExpired}
            getStockLabel={getStockLabel}
            img={img}
            handleEditClick={handleEditClick}
            setDeleteModal={setDeleteModal}
            setSearch={setSearch}
            setAddModal={setAddModal}
            search={search}
          />
        </main>

        {addModal && (
          <AddModal
            setAddModal={setAddModal}
            setNewProduct={setNewProduct}
            newProduct={newProduct}
          />
        )}
        {updateModal && (
          <UpdateModal
            setUpdateModal={setUpdateModal}
            productToUpdate={productToUpdate}
          />
        )}
        {deleteModal && (
          <DeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            setProducts={dispatch}
            products={products}
          />
        )}
      </div>
    </div>
  );
}
