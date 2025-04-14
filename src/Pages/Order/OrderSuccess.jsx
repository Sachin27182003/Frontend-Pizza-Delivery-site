import { useNavigate } from 'react-router-dom';
import OrderSuccessImage from '../../assets/Images/ordered-success.png';
import Layout from '../../Layouts/Layout';

function OrderSuccess(){


    const navigate = useNavigate();

    return (
        <Layout>
            <div className='flex flex-col justify-center items-center py-28'>
            <img 
                    width={400}
                    height={400}
                    src={OrderSuccessImage}
                />

                <p className="text-lg font-semibold">
                    Your order has been placed successfully
                </p>
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 mr-5"
                    >
                        Go to Homepage
                    </button>
                    <button
                        onClick={() => navigate('/myorders')}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Check Order Status!
                    </button>
                </div>
                
            </div>

        </Layout>
    )

}

export default OrderSuccess;