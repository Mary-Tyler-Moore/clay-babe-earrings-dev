import React, { useContext } from "react";
import { StoreContext } from "./StoreProvider";
import ProductCard from "./ProductCard";

const Products = () => {
  const { products } = useContext(StoreContext);
  return (
    <div className="flex flex-wrap">
      {products &&
        Object.values(products).map((product) => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-3"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
};

export default Products;
