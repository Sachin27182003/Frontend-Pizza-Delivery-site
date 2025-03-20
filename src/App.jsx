import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup';
import Signin from './Pages/Auth/Signin';
import NotFound from './Pages/NotFound';

function App() {

  return (

    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Signin' element={<Signin/>} />

      <Route path="*" element={<NotFound/>} />
    </Routes>
    </>

  )
}

export default App;