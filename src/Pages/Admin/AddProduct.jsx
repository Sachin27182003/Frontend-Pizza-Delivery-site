import AddProductSVG from "../../assets/Images/AddProductSVG.svg";
import Layout from "../../Layouts/Layout";

function AddProduct() {
    return (
        <Layout>
            <section className="py-12" >
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-10">
                    <div className="hidden md:flex md:w-1/2 justify-center">
                        <img className="w-[500px] h-auto" src={AddProductSVG} alt="Add Product"/>
                    </div>

                    <div className="w-full md:w-1/2 max-w-md mr-15 bg-white p-7 shadow-md rounded-lg">
                        <h2 className="mb-4 text-2xl font-semibold ">Add product</h2>

                        <form>
                            {/* Product name */}
                            <div className="mb-4">
                                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name<span className="text-red-500" >*</span></label>
                                <input 
                                    type="text" 
                                    required
                                    minLength={5}
                                    maxLength={20}
                                    name="productName" 
                                    id="productName" 
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                />
                            </div>
                            {/* Description */}
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <input 
                                    type="text" 
                                    minLength={5}
                                    maxLength={200}
                                    name="description" 
                                    id="description" 
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                />
                            </div>
                            {/* Price */}
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price<span className="text-red-500" >*</span></label>
                                <input 
                                    type="number" 
                                    required
                                    name="price" 
                                    id="price" 
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                />
                            </div>
                            {/* Quantity */}
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity<span className="text-red-500" >*</span></label>
                                <input 
                                    type="number" 
                                    required
                                    name="quantity" 
                                    id="quantity" 
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                />
                            </div>
                            {/* Category */}
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category<span className="text-red-500" >*</span></label>
                                <select 
                                    required
                                    name="category" 
                                    id="category" 
                                    defaultValue=""
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                >
                                    <option value="" disabled className="text-gray-400 font-bold" >Choose a category</option>
                                    <option value="veg">Vegetarian</option>
                                    <option value="non-veg">Non Vegetarian</option>
                                    <option value="soft-drink">Soft drinks</option>
                                    <option value="sites">Sides</option>
                                </select>
                            </div>
                            {/* Image */}
                            <div className="mb-4">
                                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Quantity<span className="text-red-600" >* (.jpg, .jpeg, .png)</span></label>
                                <input 
                                    type="file" 
                                    required
                                    name="productImage" 
                                    id="productImage" 
                                    accept=".jpg, .jpeg, .png"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                />
                            </div>

                            <button className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out ">Add Product</button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default AddProduct;                          