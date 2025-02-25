import { ArrowRightLongLine } from "../Components/Icons/Arrow-right-long-line";
import pizzaImage from '../assets/Images/pizza2.png';
import cookingImage from '../assets/Images/cooking1.png';
import { PatchCheck } from "../Components/Icons/patch-check";

function Home(){

    return (
        <div>
            {/* Hero Section */}
        <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300">
                                                               {/* justify-center */}
            <div className="w-4/6 ml-4 text-center whitespace-nowrap md:w-2/6 md:text-left ">
            
                <div className="flex justify-center text-4xl md:justify-normal">
                
                    <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text ">
                        Enjoy the slice {'...'}
                    </h1>
                    <h1>
                        😋
                    </h1>
                </div>
                <p className=" pb-4 text-[#6B7280] ">
                        The Pizza site lets you order your favourite pizza from the comfort of your home. <br/>
                        {" "}Enjoy the best pizza in your town with just one click!
                </p>
                <button className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 group">
                    Order Now !
                    {/* https://reactsvgicons.com/search?q=arrow */}
                    <span className="inline-block ml-2 transition-transform ease-in-out group-hover:translate-x-2">
                        <ArrowRightLongLine/>
                    </span>
                </button>
            </div> 

            <div>
                <img
                    src={pizzaImage}
                    alt="pizza"
                    height={550}
                    width={400}
                />
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
                    <div className="flex flex-col items-center lg:items-start" >
                        <div>
                        <h2 className="mb-2 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text">
                            Cooked by the best chefs in the World !
                        </h2>
                        <p>
                            There are many benefits regarding to that but the main ones are:
                        </p>
                        </div>
                    </div>

                    <div className="w-full p-1" >
                        <div className="flex items-center h-full p-2 pl-0 text-2xl rounded">
                        <PatchCheck className="text-base leading-relaxed text-[#6B7280] h-9 w-9 mr-2" />
                        <span> Perfect taste</span>
                        </div>
                    </div>
                    <div className="w-full p-1" >
                        <div className="flex items-center h-full p-2 pl-0 text-2xl rounded">
                        <PatchCheck className="text-base leading-relaxed text-[#6B7280] h-9 w-9 mr-2" />
                        <span> Prepared Quickly</span>
                        </div>
                    </div>
                    <div className="w-full p-1" >
                        <div className="flex items-center h-full p-2 pl-0 text-2xl rounded">
                        <PatchCheck className="text-base leading-relaxed text-[#6B7280] h-9 w-9 mr-2" />
                        <span>Hygenic food guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )

}

export default Home;