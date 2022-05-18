import { Grid, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomCard from "../CustomCard/CustomCard";
import Spinner from "../Spinner/Spinner";
import Banner from "./Banner";

import "./style.css";

const Cart = ({
  cartData,
  updateProduct,
  handleEmptycart,
  RemoveItemFromcart,
}) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const loading = () => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
    if (showSpinner) {
      return <Spinner />;
    }
    return <Banner />;
  };

  if (!cartData.line_items || !cartData.line_items.length) return loading();

  return (
    <Container id="cart">
      <Grid container justify="center" spacing={4}>
        {cartData.line_items.map((item) => {
          return (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <CustomCard
                cart
                product={item}
                updateProduct={updateProduct}
                RemoveItemFromcart={RemoveItemFromcart}
              />
            </Grid>
          );
        })}
      </Grid>
      <div className="actions">
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={handleEmptycart}
        >
          Eliminar Todo
        </Button>

        <Button
          size="small"
          color="success"
          variant="outlined"
          component={Link}
          to="/checkout"
        >
          Finalizar la Compra
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
