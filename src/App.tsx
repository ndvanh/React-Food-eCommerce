import { ChakraProvider } from '@chakra-ui/react'
import { Routes,Route } from 'react-router-dom'
import { AdminSide } from './routes/AdminSide'
import UserSide from './routes/UserSide'
// import { SkeletonTheme } from 'react-loading-skeleton'
import FoodProvider from './context/FoodContext/FoodProvider'
import LoginProvider from './context/LoginContext/LoginProvider'
import { AdminLoginForm, AdminProtectedroute } from './pages/AdminPages/AdminLogin'

function App() {  
  return (
    <LoginProvider>
      <FoodProvider>
        {/* <SkeletonTheme highlightColor="#f1f2f6" duration={2}> */}
        <ChakraProvider>
        <div className="App">
        <Routes>
          <Route path='*' element={<UserSide/>} />
          <Route path='/admin/*' element={<AdminProtectedroute><AdminSide/></AdminProtectedroute>} />
          <Route path='/admin-dangnhap' element={<AdminLoginForm/>} />
        </Routes>
        </div>
      </ChakraProvider>
      {/* </SkeletonTheme> */}
    </FoodProvider>
    </LoginProvider>
  );
}

export default App;
