import { Grid, Container, Typography } from "@mui/material";
import Product from "../../components/Product/index";
import Spinner from "../../components/Spinner/Spinner";
import "./style.css";

const Products = ({ categories, addProduct }) => {
  if (!categories.length) return <Spinner />;

  return (
    <div>
      <div className="banner_products">
        <div className="banner_products_content">
          <h2>PRODUCTOS</h2>
        </div>
      </div>

      {categories.map((category) => {
        return (
          <div id="products">
            <h2 className="category">{category.name}</h2>
            <div className="product-container">
              {category.productsData.map((product) => (
                <div key={product.id} item xs={12} sm={6} md={4}>
                  <Product product={product} addProduct={addProduct} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
