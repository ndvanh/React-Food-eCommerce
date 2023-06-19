import { ChakraProvider } from '@chakra-ui/react'
import { Routes,Route } from 'react-router-dom'
import { AdminSide } from './routes/AdminSide'
import UserSide from './routes/UserSide'
import FoodProvider from './context/FoodContext/FoodProvider'
import LoginProvider from './context/LoginContext/LoginProvider'
import { AdminLoginForm, AdminProtectedroute } from './pages/AdminPages/AdminLogin'

function App() {
  return (
    <LoginProvider>
      <FoodProvider>
        <ChakraProvider>
        <div className="App">
        <Routes>
          <Route path='*' element={<UserSide/>} />
          <Route path='/admin/*' element={<AdminProtectedroute><AdminSide/></AdminProtectedroute>} />
          <Route path='/admin-dangnhap' element={<AdminLoginForm/>} />
        </Routes>
        </div>
      </ChakraProvider>
    </FoodProvider>
    </LoginProvider>
  );
}

export default App;
