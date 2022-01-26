import { Grid, Container, Typography } from "@mui/material";
import Product from "../../components/Product/index";
import Spinner from "../../components/Spinner/Spinner";
import "./style.css";

const Products = ({ categories, addProduct }) => {
  if (!categories.length) return <Spinner />;

  return (
    <div>
      <div className="banner_products">
        <h2>PRODUCTOS</h2>
      </div>

      {categories.map((category) => {
        return (
          <Container id="products">
            <Typography className="headline" variant="h3" component="h2">
              {category.name}
            </Typography>
            <hr />
            <Grid container className="product-container">
              {category.productsData.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <Product product={product} addProduct={addProduct} />
                </Grid>
              ))}
            </Grid>
          </Container>
        );
      })}
    </div>
  );
};

export default Products;
