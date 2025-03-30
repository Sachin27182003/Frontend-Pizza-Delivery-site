import { ArrowRightLongLine } from "../Components/Icons/Arrow-right-long-line";
import pizzaImage2 from "../assets/Images/pizza2.png";
import cookingImage from "../assets/Images/cooking1.png";
import OrderFoodImg from "../assets/Images/orderFood.png";
import PickupFoodImg from "../assets/Images/pickup.png";
import EnjoyFoodImg from "../assets/Images/enjoy.png";
import { PatchCheck } from "../Components/Icons/patch-check";
import Layout from "../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect, useState } from "react";
import { getAllProducts } from "../Redux/Slices/ProductSlice";
import { Link } from "react-router-dom";
import { getAllProductFromCarts } from "../Redux/Slices/CartSlice";

function Home() {
  const dispatch = useDispatch();

  const { productsData } = useSelector((state) => state.product);

  const [count, setCount] = useState({ toSkip : 0, limit : 3});

  function handleNextButton(){
    setCount(prevCount => ({ ...prevCount, toSkip: prevCount.toSkip + 3 }));
  }

  function handlePreviousButton(){
    if(count.toSkip == 0){

    } else {
      setCount(prevCount => ({ ...prevCount, toSkip: prevCount.toSkip - 3 }));
    }
  }

  
  useEffect(() => {
    dispatch(getAllProducts(count));
    dispatch(getAllProductFromCarts());
  }, [count]);

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300">
          {/* justify-center */}
          <div className="w-4/6 ml-4 text-center whitespace-nowrap md:w-2/6 md:text-left ">
            <div className="flex justify-center text-4xl md:justify-normal">
              <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text ">
                Enjoy the slice {"..."}
              </h1>
              <h1>😋</h1>
            </div>
            <p className=" pb-4 text-[#6B7280] ">
              The Pizza site lets you order your favourite pizza from the
              comfort of your home. <br /> Enjoy the best pizza in your town
              with just one click!
            </p>
            <button className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 group">
              Order Now !{/* https://reactsvgicons.com/search?q=arrow */}
              <span className="inline-block ml-2 transition-transform ease-in-out group-hover:translate-x-2">
                <ArrowRightLongLine />
              </span>
            </button>
          </div>

          <div>
            <img src={pizzaImage2} alt="pizza" height={550} width={400} />
          </div>
        </section>

        {/* Services ssection */}
        <section className="py-4 mt-6 bg-gradient-to-r from-amber-50 to-orange-300">
          <div className="container flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center rounded-lg lg:w-1/2">
              <img
                src={cookingImage}
                width={500}
                className="rounded-lg"
                alt="Cooking"
              />
            </div>
            <div className="flex flex-col flex-wrap text-center lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div>
                  <h2 className="mb-2 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text">
                    Cooked by the best chefs in the World !
                  </h2>
                  <p>
                    There are many benefits regarding to that but the main ones
                    are:
                  </p>
                </div>
              </div>

              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 pl-0 text-2xl rounded">
                  <PatchCheck className="text-base leading-relaxed text-[#6B7280] h-9 w-9 mr-2" />
                  <span> Great food</span>
                </div>
              </div>
              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 pl-0 text-2xl rounded">
                  <PatchCheck className="text-base leading-relaxed text-[#6B7280] h-9 w-9 mr-2" />
                  <span> Great taste</span>
                </div>
              </div>
              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 pl-0 text-2xl rounded">
                  <PatchCheck className="text-base leading-relaxed text-[#6B7280] h-9 w-9 mr-2" />
                  <span> Prepared Quickly</span>
                </div>
              </div>
              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 pl-0 text-2xl rounded">
                  <PatchCheck className="text-base leading-relaxed text-[#6B7280] h-9 w-9 mr-2" />
                  <span>Hygenic food guaranteed</span>
                </div>
              </div>
              <div className="px-5 py-4 mx-auto">
                <div className="flex justify-center py-4">
                  <div className="inline-flex w-16 h-1 bg-yellow-500 rounded-full"></div>
                </div>

                <div className="flex flex-wrap space-y-6 md:space-y-0">
                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={OrderFoodImg} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                        Order Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        As easy as 1, 2, 3, just select your favourite pizza and
                        place your order.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={PickupFoodImg} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                        Pickup Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        Pick up your order from the nearest store or get it
                        delivered to your doorstep.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={EnjoyFoodImg} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                        Enjoy Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        As soon as you get your order, enjoy the delicious pizza
                        with your loved ones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* {productsData.map ((product) => <div key={product._id} > {product.name}</div> ) } */}

        <div className="grid mx-auto  ">
          <Link to={"/products"}>
            <div className="flex mt-4 mr-4 item-center justify-end">
              <button className="flex h-auto w-28 px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 group">
                view all
                <span className="inline-block ml-2 transition-transform ease-in-out group-hover:translate-x-2">
                  <ArrowRightLongLine />
                </span>
              </button>
            </div>
          </Link>
          <div className="flex flex-wrap justify-center">
            <div
                id="container"
                className="grid md:w-[5px] md:mr-4 items-center justify-center"
              >
                <button onClick={handlePreviousButton}>
                  <span className="relative flex w-12 h-12 bg-orange-500 rounded-full ">
                    <span className="absolute  w-5 h-5 transform -rotate-[130deg] border-t-2 border-r-2 border-white top-1/2 right-2 -translate-y-1/2"></span>
                  </span>
                </button>
              </div>
            {productsData.map((product, key) => {
              return (
                product.inStock && (
                  <div className="p-4 md:w-[475px] " key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <div className="overflow-hidden border rounded-lg border-opacity-60">
                        <img
                          src={product.productImage}
                          alt="Pizza Image"
                          className="object-contain object-center w-full lg:h-48 md:h-36"
                        />
                        <div className="p-6 border">
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
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              );
            })}
            <div
              id="container"
              className="grid md:w-[5px] ml-5 items-center justify-center"
            >
              <button onClick={handleNextButton}>
                <span className="relative flex w-12 h-12 bg-orange-500 rounded-full ">
                  <span className="absolute mr-2 w-5 h-5 transform rotate-45 border-t-2 border-r-2 border-white top-1/2 right-2 -translate-y-1/2"></span>
                </span>
              </button>
            </div>
          </div>
          <div className="h-5 w-full bg-gradient-to-r from-amber-50 to-orange-300"></div>
          <div className="w-full h-auto border-red-100">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.450808927857!2d77.50428727528265!3d28.465967275756068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1d0a6ca560b%3A0xfe7fea4f71232ff4!2sDarsh%20Boys%20PG!5e0!3m2!1sen!2sin!4v1743271046212!5m2!1sen!2sin" 
                width="100%"
                height="450" 
                style={{border:0}} 
                allowFullScreen 
                loading={{lazy}} 
                referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
