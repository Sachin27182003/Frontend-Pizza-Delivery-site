import React, { useEffect, useState } from "react";
import genieImage from "../assets/Images/genie-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrders } from "../Redux/Slices/OrderSlice";

function Chatbot() {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.auth.data.firstName);
  const myOrders = useSelector((state) => state.order.myOrders);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [step, setStep] = useState("start"); // "start", "orderList", "orderOptions"
  const [activeOrders, setActiveOrders] = useState([]);
  const [notActiveOrders, setNotActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [isActive, setIsActive] = useState(false);

  const getActiveOrders = (orders) => {
    if (!orders) return [];
    return orders.filter(
      (order) => order.status != "DELIVERED" && order.status != "CANCELLED"
    );
  };

  const getNotActiveOrders = (orders) => {
    if (!orders) return [];
    return orders.filter(
      (order) => order.status === "DELIVERED" || order.status === "CANCELLED"
    );
  };

  // console.log( "notActiveOrders2", notActiveOrders.items.map((product) => console.log(product)));

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    setStep("start");
    setSelectedOrder(null);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setStep("orderOptions");
  };

  async function handleAddressUpdate(orderId, updatedValue) {
    let response;
    if ("address" in updatedValue) {
      console.log(updatedValue);
      response = await dispatch(
        updateOrders({
          orderId: orderId,
          updatedValue: { address: updatedValue.address },
        })
      );
    } else {
      console.log(updatedValue);
      response = await dispatch(
        updateOrders({
          orderId: orderId,
          updatedValue: { status: updatedValue.status },
        })
      );
    }

    console.log("response", response.payload.data.success);

    if (response?.payload?.data?.success) {
      setStep("orderOptions");
    }

    // const response = await dispatch(updateOrders(productId, newAddress));
  }

  useEffect(() => {
    const filtered = getActiveOrders(myOrders);
    setActiveOrders(filtered);
    const NotActiveFiltered = getNotActiveOrders(myOrders);
    setNotActiveOrders(NotActiveFiltered);
    dispatch(fetchOrders());
  }, [step, selectedOrder]);

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-10 lg:right-8 md:bottom-5 md:right-5 flex flex-col items-end">
      {isChatbotOpen && (
        <div className="bg-white rounded-md shadow-lg w-80 h-96 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 px-4 font-semibold flex justify-between items-center">
            Hi {name}!
            <button
              onClick={toggleChatbot}
              className="text-red text-xl focus:outline-none"
            >
              ×
            </button>
          </div>

          {/* ✅ New Dynamic Chatbot Content */}
          <div className="p-3 flex-1 overflow-y-auto text-sm">
            {step === "start" && (
              <button
                onClick={() => setStep("orderList")}
                className="bg-gradient-to-r from-orange-500 to-orange-400  text-white px-4 py-2 rounded w-full"
              >
                Track Your Order
              </button>
            )}

            {step === "orderList" && (
              <div className="">
                <p className="mb-2 font-medium">Active Orders</p>
                {activeOrders.length === 0 ? (
                  <div className="text-center">
                    <p>No active orders found</p>
                  </div>
                ) : (
                  [...activeOrders].reverse().map((order) => (
                    <button
                      key={order._id}
                      onClick={() => {
                        setIsActive(true);
                        handleOrderSelect(order);
                      }}
                      className="w-full mb-2 p-2 bg-gradient-to-r from-orange-200 to-orange-100 border rounded hover:bg-purple-100"
                    >
                      {order.items.map((item) => (
                        <div
                          className="flex p-2 items-center justify-between"
                          key={item.product._id}
                        >
                          {item.product.name}
                          <img
                            className="w-20 h-10 rounded-md"
                            src={item.product.productImage}
                          />
                        </div>
                      ))}
                      <div className="grid p-2 text-left text-[#6B7280]">
                        <div className="">Total Price: ₹{order.totalPrice}</div>
                        <div className="">
                          Category: {order.items[0].product.category}
                        </div>
                        <div>
                          Ordered at:{" "}
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                        </div>
                      </div>
                    </button>
                  ))
                )}

                <p className="mb-2 mt-2 font-medium">Previous Orders</p>
                {[...notActiveOrders].reverse().map((order) => (
                  <button
                    key={order._id}
                    onClick={() => {
                      setIsActive(false);
                      handleOrderSelect(order);
                    }}
                    className="w-full mb-2 p-2 bg-gradient-to-r from-orange-200 to-orange-100 border rounded hover:bg-purple-100"
                  >
                    {order.items.map((item) => (
                      <div
                        key={item.product._id}
                        className="flex p-2 text-base font-semibold items-center justify-between bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text"
                      >
                        {item.product.name}
                        <img
                          className="w-20 h-10 rounded-md"
                          src={item.product.productImage}
                        />
                      </div>
                    ))}
                    <div className="grid p-2 text-left text-[#6B7280]">
                      <div className=""> Total Price: ₹{order.totalPrice} </div>
                      <div className="">
                        {" "}
                        Category: {order.items[0].product.category}{" "}
                      </div>
                      <div>
                        Ordered at:{" "}
                        {new Date(order.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => setStep("start")}
                  className="w-full mb-2 p-2 border rounded hover:bg-orange-200"
                >
                  {" "}
                  Back to Previous Menu
                </button>
              </div>
            )}

            {step === "orderOptions" && selectedOrder && (
              <span>
                <div className="bg-gradient-to-r from-orange-200 to-orange-100 border rounded hover:bg-purple-100">
                  <button className="w-full mb-2 p-2 ">
                    {selectedOrder.items.map((product) => (
                      <div key={product._id} className="text-left">
                        <div className="flex p-2 text-base font-semibold items-center justify-between bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text">
                          <span className="grid text-left">
                            {product.product.name}
                            <span className="text-sm font-normal text-gray-700">
                              {product.product.category}
                            </span>
                          </span>

                          <img
                            className="w-20 h-10 rounded-md"
                            src={product.product.productImage}
                            alt={product.product.name}
                          />
                        </div>
                      </div>
                    ))}
                  </button>
                  <div className="grid p-2 text-left text-[#6B7280]">
                    <div className="px-3 py-1 mb-2 rounded-md inline-block font-semibold shadow-sm bg-green-100 text-green-800">
                      Name: {name}
                    </div>
                    <div className="px-3 py-1 mb-2 rounded-md inline-block font-semibold shadow-sm bg-green-100 text-green-800">
                      Total Price: ₹{selectedOrder.totalPrice}
                    </div>

                    <div
                      className={`px-3 py-1 rounded-md inline-block font-semibold shadow-sm ${
                        selectedOrder.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : selectedOrder.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div> Status: {selectedOrder.status}</div>
                    </div>
                    <div className="px-3 py-1 mt-2 rounded-md inline-block font-semibold shadow-sm bg-green-100 text-green-800">
                      Address: {selectedOrder.address}
                    </div>
                    <div className="px-3 py-1 mt-2 rounded-md inline-block font-semibold shadow-sm bg-green-100 text-green-800">
                      Ordered at:
                      {new Date(selectedOrder.createdAt).toLocaleString(
                        "en-IN",
                        {
                          timeZone: "Asia/Kolkata",
                        }
                      )}
                    </div>
                    <div className="px-3 py-1 mt-2 rounded-md inline-block font-semibold shadow-sm bg-green-100 text-green-800">
                      Payment Method: {selectedOrder.PaymentMethod}
                    </div>
                    {/* {isActive && ( */}
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => setStep("updateAddress")}
                        className="px-4 py-2 bg-purple-200 text-purple-800 font-medium rounded-xl hover:bg-purple-300 transition duration-200 shadow-md"
                      >
                        Update Address
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddressUpdate(selectedOrder._id, {
                            status: "CANCELLED",
                          });
                          setSelectedOrder({
                            ...selectedOrder,
                            status: "CANCELLED",
                          });
                        }}
                        className="px-4 py-2 bg-rose-200 text-rose-800 font-medium rounded-xl hover:bg-rose-300 transition duration-200 shadow-md"
                      >
                        Cancel Order
                      </button>
                    </div>
                    {/* )} */}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setStep("orderList");
                    setSelectedOrder(null);
                  }}
                  className="w-full mt-2 p-2 border rounded hover:bg-orange-200"
                >
                  {" "}
                  Back to Previous Menu
                </button>
              </span>
            )}

            {step === "updateAddress" && (
              <span>
                <div className="bg-gradient-to-r from-orange-200 to-orange-100 border rounded hover:bg-purple-1">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddressUpdate(selectedOrder._id, {
                        address: newAddress,
                      });
                      setSelectedOrder({
                        ...selectedOrder,
                        address: newAddress,
                      });
                    }}
                    className="w-full mb-2 p-2"
                  >
                    <input
                      onChange={(e) => setNewAddress(e.target.value)}
                      type="text"
                      placeholder="Enter new address"
                      className="w-full p-2 border rounded"
                    />
                    <button
                      type="submit"
                      className="w-full mt-2 p-2 bg-orange-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 shadow-md"
                    >
                      Update Address
                    </button>
                  </form>
                </div>
                <button className="w-full mt-2 p-2 border rounded hover:bg-orange-200">
                  {" "}
                  Back to Previous Menu
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* 🧞 Your original closed chatbot icon untouched */}
      {!isChatbotOpen && (
        <div className="bottom-4 right-4 lg:bottom-10 lg:right-8 md:bottom-5 md:right-5">
          <button onClick={toggleChatbot} className="ml-5 lg:ml-4 md:ml-5">
            <div className="w-12 h-12 lg:w-24 lg:h-24 md:w-16 md:h-16 rounded-full border-4 border-blue-500 flex items-center justify-center shadow-2xl shadow-red-600 cursor-pointer">
              <img
                src={genieImage}
                className="w-10/12 h-10/12 rounded-full"
                alt="Genie"
              />
            </div>
          </button>
          <div className="text-red-500 text-xs lg:text-lg md:text-sm font-bold mt-1">
            Ask your genie!
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
