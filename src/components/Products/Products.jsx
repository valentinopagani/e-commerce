import Product from "../Product/index";
import Spinner from "../Spinner/Spinner";
import "./style.css";

const Products = ({ categories, addProduct }) => {
  if (!categories.length) return <Spinner />;

  return (
    <div>
      <div className="banner_home">
        <div className="banner_home_content">
          <h1>Emme R301</h1>
        </div>
      </div>

      <div className="banner_products">
        <div className="banner_products_content">
          <h2>NUESTROS PRODUCTOS</h2>
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
