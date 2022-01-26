import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
import NavBar from "./components/NavBar/NavBar";
import Products from "./screens/Products/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Home from "./screens/Home/Home";

function App() {
  const [categories, setCategories] = useState([]);
  const [cartData, setcartData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");

  const fetchProducts = async () => {
    const { data: products } = await commerce.products.list();
    const { data: categoriesData } = await commerce.categories.list();

    const productsPerCategory = categoriesData.reduce((acc, category) => {
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter((products) =>
            products.categories.find((cat) => cat.id === category.id)
          ),
        },
      ];
    }, []);

    setCategories(productsPerCategory);
  };

  const fetchcartData = async () => {
    const response = await commerce.cart.retrieve();
    setcartData(response);
  };

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setcartData(response.cart);
  };

  const RemoveItemFromcart = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setcartData(response.cart);
  };

  const handleEmptycart = async () => {
    const response = await commerce.cart.empty();
    setcartData(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setcartData(response.cart);
  };

  const refreshcart = async () => {
    const newcartData = await commerce.cart.refresh();
    setcartData(newcartData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(
      //   checkoutId,
      //   orderData
      // );

      setOrderInfo(orderData);

      refreshcart();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error occurred"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchcartData();
  }, []);

  return (
    <Router>
      <div>
        <CssBaseline />
        <NavBar
          cartItems={cartData.total_items}
          totalCost={
            (cartData.subtotal && cartData.subtotal.formatted_with_symbol) ||
            "00.00"
          }
        />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route
            exact
            path="/productos"
            element={
              <Products categories={categories} addProduct={addProduct} />
            }
          />

          <Route
            exact
            path="/cart"
            element={
              <Cart
                cartData={cartData}
                updateProduct={updateProduct}
                handleEmptycart={handleEmptycart}
                RemoveItemFromcart={RemoveItemFromcart}
              />
            }
          />

          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                orderInfo={orderInfo}
                orderError={orderError}
                cartData={cartData}
                handleCheckout={handleCheckout}
              />
            }
          />

          <Route
            exact
            path="/product-view/:id"
            element={<ProductView addProduct={addProduct} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
