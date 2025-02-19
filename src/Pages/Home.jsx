import { ArrowRightLongLine } from "../Components/Icons/Arrow-right-long-line";

function Home(){

    return (
        <div>
            {/* Hero Section */}
        <section className="flex flex-col-reverse items-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300">
                                                               {/* justify-center */}
            <div className="w-4/6 ml-[400px] text-center whitespace-nowrap md:w-2/6 md:text-left ">
            
                <div className="flex justify-center text-4xl md:justify-normal">
                
                    <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text ">
                        Welcome to the Pizza Delivery site {'...'}
                    </h1>
                    <h1>
                        😋
                    </h1>
                </div>
                <p className=" ml-2 pb-4 text-[#6B7280] ">
                        The Pizza site lets you order your favourite pizza from the comfort of your home. <br/>
                        Enjoy the best pizza in your town with just one click!
                </p>
                <button className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 group">
                    Order Now !
                    {/* https://www.reshot.com/free-svg-icons/item/right-arrow-UCA8NGYZDJ/ */}
                    <span className="inline-block ml-2 transition-transform ease-in-out group-hover:translate-x-2">
                        <ArrowRightLongLine/>
                    </span>
                </button>
            </div> 

        </section>
        </div>
    )

}

export default Home;