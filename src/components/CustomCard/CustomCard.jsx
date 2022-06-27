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

          <Tooltip title="añadir producto" placement="top">
            <IconButton
              className="add-button"
              onClick={() => {
                addProduct(product.id, 1);
              }}
            >
              <ShoppingBagOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Link to={`/product-view/${product.id}`}>
            <Tooltip title="ver producto" placement="top">
              <IconButton className="view-button">
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>
          </Link>
        </>
      )}
      {cart && (
        <Typography className="price" gutterBottom>
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
