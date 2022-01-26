import {
  CardMedia,
  CardActions,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import "./style.css";

const CustomCard = ({
  cart,
  product,
  addProduct,
  updateProduct,
  RemoveItemFromcart,
}) => {
  return (
    <div className="card">
      <CardMedia
        component="img"
        alt={product.name}
        height="260"
        className="card-image"
        image={product.image.url}
        title={product.name}
      />
      <Typography className="title" gutterBottom>
        {product.name}
      </Typography>
      {!cart && (
        <>
          <Typography gutterBottom variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>

          <IconButton
            className="add-button"
            onClick={() => {
              addProduct(product.id, 1);
            }}
            title="Agregar a la Bolsa"
          >
            <ShoppingBagOutlinedIcon />
          </IconButton>

          <Link to={`/product-view/${product.id}`} title="Ver Producto">
            <IconButton className="view-button">
              <VisibilityOutlined />
            </IconButton>
          </Link>
        </>
      )}
      {cart && (
        <Typography gutterBottom variant="h5">
          {product.price.formatted_with_symbol}
        </Typography>
      )}
      <CardActions className="actions-content">
        {cart && (
          <>
            <Tooltip title="Restar Unidad">
              <IconButton
                size="small"
                onClick={() => {
                  updateProduct(product.id, product.quantity - 1);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>

            <Typography>&nbsp;{product.quantity}&nbsp;</Typography>

            <Tooltip title="Añadir Unidad">
              <IconButton
                onClick={() => {
                  updateProduct(product.id, product.quantity + 1);
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>

            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => {
                RemoveItemFromcart(product.id);
              }}
            >
              Eliminar Producto
            </Button>
          </>
        )}
      </CardActions>
    </div>
  );
};

export default CustomCard;
