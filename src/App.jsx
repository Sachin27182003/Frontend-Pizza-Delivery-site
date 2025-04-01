import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup';
import Signin from './Pages/Auth/Signin';
import NotFound from './Pages/NotFound';
import AddProduct from './Pages/Admin/AddProduct';
import Denied from './Pages/Denied';
import ProductDetails from './Pages/Products/ProductDetails';
import CartDetails from './Pages/Cart/CartDetails';
import Order from './Pages/Order/Order';
import OrderSuccess from './Pages/Order/OrderSuccess';
import RequireAuth from './Components/Auth/RequireAuth';
import IsAdmin from './Pages/IsAdminPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/auth/Signup' element={<Signup/>} />
      <Route path='/auth/Signin' element={<Signin/>} />

      <Route element={<RequireAuth/>}>

      <Route path='/order' element={<Order/>} />
      <Route path='/order/success' element={<OrderSuccess/>} />

      <Route element={<IsAdmin/>}>
      <Route path='/admin/addProduct' element={<AddProduct/>} />
      </Route>

      <Route path='/product/:productId' element={<ProductDetails />} />
      <Route path='/cart' element={<CartDetails/>} />

      </Route>
      

      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App;