import React, { useState, useEffect, useMemo } from "react";
import MobileHeader from "../../components/sellingproductpage/MobileHeader";
import SideBarSellPage from "../../components/sellingproductpage/SideBarSellPage";
import MainContentSellPage from "../../components/sellingproductpage/MainContentSellPage";
import DeleteModal from "../../components/sellingproductpage/DeleteModal";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

const SellingPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    buyPrice: "",
    price: "",
    name: "",
    quantity: "",
    company: "",
    total: "",
    image: "image should come here",
  });
  const [stockError, setStockError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    company: "All",
    stock: "All",
    price: 100000,
    sort: "none",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const clearCart = () => {
    setCartItems([]);
  };

  // Fetch data from API and transform it

  const { user } = useAuthContext();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        const transformed = data.map((item) => ({
          id: item._id,
          name: item.name,
          stock: item.quantity,
          buyPrice: Number(item.buy_price),
          price: Number(item.selling_price),
          company: item.brand,
          image: item.img
            ? item.img.startsWith("http")
              ? item.img
              : `http://localhost:3000${item.img}`
            : "https://via.placeholder.com/50",
        }));

        setProducts(transformed);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [user]);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  //  Handle product selection
  const handleProductClick = (product) => {
    setFormData({
      id: product.id,
      buyPrice: product.buyPrice,
      price: product.price,
      name: product.name,
      quantity: "",
      company: product.company,
      total: "",
      image: product.image,
    });
    setStockError("");
    if (isMobile) setMobileSidebarOpen(false);
  };

  //  Handle quantity input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    if (name === "quantity" && formData.price) {
      newFormData.total = Number(value) * Number(formData.price);
      const selectedProduct = products.find((p) => p.id === formData.id);
      if (selectedProduct && Number(value) > selectedProduct.stock) {
        setStockError("We don't have enough stock");
      } else {
        setStockError("");
      }
    }

    setFormData(newFormData);
  };

  //  Add to cart
  const handleAddToCart = () => {
    if (!formData.id || !formData.quantity || !formData.total || stockError)
      return;
    setCartItems([...cartItems, { ...formData }]);
    setFormData({
      id: "",
      price: "",
      name: "",
      quantity: "",
      company: "",
      total: "",
      image: "",
    });
  };

  //  Delete cart item
  const handleDeleteClick = (index) => {
    setItemToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const newCartItems = [...cartItems];
    newCartItems.splice(itemToDelete, 1);
    setCartItems(newCartItems);
    setShowDeleteModal(false);
  };

  // Handle filter change
  const handleFilterChange = (updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
  };

  const filteredProducts = useMemo(() => {
    let temp = [...products];

    if (searchTerm) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.company !== "All") {
      temp = temp.filter((p) => p.company === filters.company);
    }

    if (filters.stock === "In Stock") {
      temp = temp.filter((p) => p.stock > 0);
    } else if (filters.stock === "Low Stock") {
      temp = temp.filter((p) => p.stock < 10);
    }

    temp = temp.filter((p) => p.price <= filters.price);

    if (filters.sort === "price-low-high")
      temp.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-high-low")
      temp.sort((a, b) => b.price - a.price);
    else if (filters.sort === "name-a-z")
      temp.sort((a, b) => a.name.localeCompare(b.name));
    else if (filters.sort === "name-z-a")
      temp.sort((a, b) => b.name.localeCompare(a.name));

    return temp;
  }, [products, filters, searchTerm]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 h-16">
        <Navbar toggleSidebar={toggleSidebar} checkForSellPage={true} />
      </div>

      <div className="w-full h-screen pt-16 flex flex-col md:flex-row font-sans text-sm bg-gray-50">
        <MobileHeader
          setMobileSidebarOpen={setMobileSidebarOpen}
          mobileSidebarOpen={mobileSidebarOpen}
        />

        <SideBarSellPage
          mobileSidebarOpen={mobileSidebarOpen}
          isMobile={isMobile}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredProducts={filteredProducts}
          handleProductClick={handleProductClick}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />

        <MainContentSellPage
          formData={formData}
          stockError={stockError}
          handleAddToCart={handleAddToCart}
          cartItems={cartItems}
          handleDeleteClick={handleDeleteClick}
          handleChange={handleChange}
          totalAmount={totalAmount}
          clearCart={clearCart}
        />

        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          confirmDelete={confirmDelete}
        />
      </div>
    </>
  );
};

export default SellingPage;
