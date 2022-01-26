import { Container, Typography, Button, Grid } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import "./style.css";

const Banner = () => {
  return (
    <div className="cart-banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              La Bolsa está vacía, agregá productos para comprar!!
            </Typography>
            <Button className="shopping-button" component={Link} to="/">
              Ir al Inicio
            </Button>
          </Grid>
          <Grid className="brand" item xs={12} sm={6}>
            <ShoppingBagOutlinedIcon />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
