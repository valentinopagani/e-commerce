import CustomCard from "../CustomCard/CustomCard";

const Product = ({ cart, product, addProduct, RemoveItemFromcart }) => (
  <CustomCard
    cart={cart}
    product={product}
    addProduct={addProduct}
    RemoveItemFromcart={RemoveItemFromcart}
  />
);

export default Product;
