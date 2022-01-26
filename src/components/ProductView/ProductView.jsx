import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce.js";
import { Button, Grid, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = ({ addProduct }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    const { name, price, image, quantity, description } = response;
    setProduct({
      id,
      name,
      quantity,
      description,
      src: image.url,
      price: price.formatted_with_symbol,
    });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  const handleQuantity = (param) => {
    if (param === "decries" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (param === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="product-view">
      <Grid item className="image-wrapper">
        <img src={product.src} alt={product.name} />
      </Grid>
      <Grid item className="text">
        <Typography variant="h2">{product.name}</Typography>
        <Typography
          variant="p"
          dangerouslySetInnerHTML={createMarkup(product.description)}
        />
        <Typography variant="h3">{product.price}</Typography>
        <Grid className="buttons">
          <Grid item>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => {
                handleQuantity("decries");
              }}
            >
              -
            </Button>
          </Grid>
          <Grid item>
            <Typography className="quantity" variant="h3">
              {quantity}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                handleQuantity("increase");
              }}
            >
              +
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => {
              addProduct(product.id, quantity);
            }}
          >
            <ShoppingBagOutlinedIcon /> Añadir al Bolsa
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductView;
