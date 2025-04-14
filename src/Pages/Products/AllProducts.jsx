import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addProductToCart,
  getAllProductFromCarts,
  removeProductFromCart,
} from "../../Redux/Slices/CartSlice";
import { getAllProducts } from "../../Redux/Slices/ProductSlice";
import Layout from "../../Layouts/Layout";

function AllProducts() {
  const dispatch = useDispatch();

  const { productsData } = useSelector((state) => state.product);

  const [count, setCount] = useState({ toSkip: 0, limit: 12 });

  function handleNextButton() {
    setCount((prevCount) => ({ ...prevCount, toSkip: prevCount.toSkip + 12 }));
  }

  async function handleCart(productId) {
    const response = await dispatch(addProductToCart(productId));
    if (response?.payload?.success) {
      dispatch(getAllProductFromCarts());
    }
  }

  async function handleRemove(productId) {
    const response = await dispatch(removeProductFromCart(productId));
    if (response?.payload?.success) {
      dispatch(getAllProductFromCarts());
    }
  }

  function handlePreviousButton() {
    if (count.toSkip == 0) {
    } else {
      setCount((prevCount) => ({
        ...prevCount,
        toSkip: prevCount.toSkip - 12,
      }));
    }
  }

  useEffect(() => {
    dispatch(getAllProducts(count));
    dispatch(getAllProductFromCarts());
  }, [count]);

  return (
    <Layout>
      <div className="grid mx-auto items-center justify-center ">
        <div className="flex flex-wrap justify-center">
          {productsData.map((product, key) => {
            return (
              product.inStock && (
                <div className="p-4 md:w-1/3 " key={product._id}>
                  <div className="overflow-hidden border rounded-lg border-opacity-60 border-b-0">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.productImage}
                        alt="Pizza Image"
                        className="object-contain object-center w-full lg:h-48 md:h-36"
                      />
                    </Link>
                    <div className="p-6 border">
                      <Link to={`/product/${product._id}`}>
                        <span>
                          <h2 className="text-xs font-medium tracking-widest text-gray-400 title-font">
                            {product.category}
                          </h2>
                          <h1 className="mb-1 text-lg font-medium text-gray-900 title-font">
                            {product.name}
                          </h1>
                          <p className="mb-1 text-base leading-relaxed">
                            {product.description}
                          </p>
                          <p className="text-lg font-medium text-gray-900 title-font">
                            ₹{product.price}
                          </p>
                        </span>
                      </Link>
                      <div className="flex gap-3">
                      <button
                          className="flex px-6 py-2 mt-4 text-white bg-yellow-500 border-0 rounded-lg focus:outline-none hover:bg-yellow-600 "
                          onClick={(e) => {
                            handleCart(product._id);
                          }}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="flex px-6 py-2 mt-4 text-white bg-yellow-500 border-0 rounded-lg focus:outline-none hover:bg-yellow-600"
                          onClick={(e) => {
                            handleRemove(product._id);
                          }}
                        >
                          Remove from cart
                        </button>                        
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div
          id="container"
          className="flex gap-5 md:w-full md:h-auto ml-5 items-center justify-center"
        >
          <button onClick={handlePreviousButton}>
            <span className="relative flex w-12 h-12 bg-orange-500 rounded-full ">
              <span className="absolute  w-5 h-5 transform -rotate-[130deg] border-t-2 border-r-2 border-white top-1/2 right-2 -translate-y-1/2"></span>
            </span>
          </button>
          <button onClick={handleNextButton}>
            <span className="relative flex w-12 h-12 bg-orange-500 rounded-full ">
              <span className="absolute mr-2 w-5 h-5 transform rotate-45 border-t-2 border-r-2 border-white top-1/2 right-2 -translate-y-1/2"></span>
            </span>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default AllProducts;
