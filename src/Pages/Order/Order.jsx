import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProductFromCarts } from "../../Redux/Slices/CartSlice";
import { placeOrder } from "../../Redux/Slices/OrderSlice";
import toast from "react-hot-toast";

function Order() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartsData} = useSelector((state) => state.cart);

    const [details, setDetails] = useState({
        paymentMethod: 'COD',
        address: ''
    });

    async function fetchCartDetails() {
        await dispatch(getAllProductFromCarts());
       }

    function handleUserInput(e){
        const {name, value} = e.target;
        setDetails({...details, [name]: value});
    }

    async function handleFormSubmit(e){

        console.log("hello")
        e.preventDefault();
        // if(details.paymentMethod === '' || details.address === ''){
        //     toast.error("Please fill all the fields");
        //     return;
        // }

        const response = await dispatch(placeOrder(details));

        console.log("orderResponse", response);

        if(response?.payload?.data?.success){
            toast.success("Order Placed Successfully");
            navigate('/order/success');
        }
    }

    useEffect(() => {
        fetchCartDetails();
    }, [])

    


    return (
        <Layout>
            <section className="text-gray-600 body-font min-h-56">

                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 ">
                            Thank for Choosing Us!! {' '} 
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Total Price - 
                            <span className="font-bold text-red-900">
                                ₹ {cartsData?.length === 0 ? '' : cartsData?.reduce((acc, item) => acc + item?.quantity * item?.product?.price, 0)} 
                            </span>
                        </p>

                    </div>

                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="grid relative flex-grow w-full ">
                            <label htmlFor="paymentMethod" className="text-xl leading-7 text-gray-600 mb-2">
                                Payment Method
                            </label>
                            <select 
                                name="paymentMethod"
                                required
                                onChange={handleUserInput}
                                className="p-2 border rounded-md focus:outline-none focus:border-primary-500 bg-white text-gray-700"
                            >
                                <option value="COD">Cash On Delivery</option>
                                <option value="UPI">UPI </option>  
                                <option value="INTERNET-BANKING">Internet Banking</option>  
                                <option value="CARD">Card</option>  
                                <option value="WALLET">Wallet</option>  
                            </select>
                        </div>

                        <div className="relative flex-grow w-full my-3">
                            <label htmlFor="address" className="leading-7 text-xl text-gray-600 mb-3">
                                Address
                            </label>
                            <textarea
                                name="address"
                                minLength={10}
                                required
                                onChange={handleUserInput}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-primary-500 bg-white text-gray-700"
                            >

                            </textarea>
                        </div>

                        <button className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg">
                            Place Order
                        </button>
                    </form>

                </div>

            </section>
        </Layout>
    )
}

export default Order;