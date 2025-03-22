import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup';
import Signin from './Pages/Auth/Signin';
import NotFound from './Pages/NotFound';
import AddProduct from './Pages/Admin/AddProduct';
import Denied from './Pages/Denied';

function App() {

  return (

    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/denied" element={<Denied/>} />
      <Route path='/auth/Signup' element={<Signup/>} />
      <Route path='/auth/Signin' element={<Signin/>} />
      <Route path='/admin/addProduct' element={<AddProduct/>} />

      <Route path="*" element={<NotFound/>} />
    </Routes>
    </>

  )
}

export default App;