import { Box, TextField } from "@mui/material";
import Product from "../../components/Product/index";
import Spinner from "../../components/Spinner/Spinner";
import "./style.css";

const Home = ({ categories, addProduct }) => {
  if (!categories.length) return <Spinner />;

  return (
    <div>
      <div className="banner_home">
        <div className="banner_home_content">
          <h1>Emme R-301</h1>
        </div>
        <div className="gradient" />
      </div>

      <div className="banner_products">
        <div className="banner_products_content">
          <h2>NUESTROS PRODUCTOS</h2>
        </div>
      </div>

      <br />
      <br />

      {categories.map((category) => (
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
      ))}

      <footer>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 0, width: "50ch" },
          }}
          autoComplete="on"
        >
          <TextField
            id="standard-basic"
            label="Enviar un comentario"
            variant="standard"
          />
        </Box>
      </footer>
    </div>
  );
};

export default Home;
