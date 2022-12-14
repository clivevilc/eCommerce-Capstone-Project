import SHOP_DATA from "../../shop-data.json";
import React from "react";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../Components/product-card/product-card.component";
import './shop.styles.scss'

// Scaffolding the Shop from object 'shop-data.js'
const Shop = () => {
  const { products } = useContext(ProductsContext);
  
    return (
    <div className="products-container">
      {products.map((product) => (
<ProductCard key={product.id} product = {product} />
      ))}
    </div>
  );
};

export default Shop;
