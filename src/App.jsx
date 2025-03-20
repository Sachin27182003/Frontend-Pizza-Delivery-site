import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup';
import Signin from './Pages/Auth/Signin';

function App() {

  return (

    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Signin' element={<Signin/>} />
    </Routes>
    </>

  )
}

export default App;