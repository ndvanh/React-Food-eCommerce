import { Routes,Route } from 'react-router-dom'
import { UserInfo } from '../components/UserComponents/Login'
import { Footer, Header,BackToTop } from "../components/UserComponents/redirect/index"
import {Home, NotFound,Promotion,Contact} from "../pages/UserPages"
import { Cart, Payment } from '../pages/UserPages/CartPages/index'
import {FoodMenu,FoodMenuDefault,FoodType,ProductDetail} from "../pages/UserPages/FoodPages/index"
import { LoginPage,Protectedroute, SignUp } from '../pages/UserPages/Login'
import { News,NewsDetail } from '../pages/UserPages/NewsPages'

const UserSide = () => {
  return (
  <div>
 <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/thuc-don' element={<FoodMenu/>}>
        <Route index element={<FoodMenuDefault/>}/>
        <Route path=':food_type' element={<FoodType/>}/>
      </Route>
      <Route path='/thuc-don/:food_type/:food_name' element={<ProductDetail/>}/>
      <Route path='/khuyen-mai' element={<Promotion/>}/>
      <Route path='/lien-he' element={<Contact/>}/>
      <Route path='/tin-tuc' element={<News/>}/>
      <Route path='/tin-tuc/:news_title' element={<NewsDetail/>}/>
      <Route path='/dang-nhap' element={<LoginPage/>}/>
      <Route path='/dang-ky' element={<SignUp/>}/>
      <Route path='/thong-tin' element={<Protectedroute><UserInfo/></Protectedroute>}/>
      <Route path='/gio-hang' element={<Protectedroute><Cart/></Protectedroute>}/>
      <Route path='/thanh-toan' element={<Protectedroute><Payment/></Protectedroute>}/>
      <Route path='*' element={<NotFound/>} />
    </Routes>
  <Footer/>
  <BackToTop/>
    </div>
  )
}
export default UserSide