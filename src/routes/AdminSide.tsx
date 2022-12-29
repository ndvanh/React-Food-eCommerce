import { Routes,Route } from 'react-router-dom'
import { AdminNav } from '../components/AdminComponents'
import AdminDashBoard from '../pages/AdminPages/AdminDashboard'
import { AddContact, ContactDashboard,UpdateContact } from '../pages/AdminPages/Contact'
import { MenuDashboard,AddMenu,UpdateMenu } from '../pages/AdminPages/Menu/index'
import { AddNews, NewsDashboard, NewsDetailInfo, UpdateNews } from '../pages/AdminPages/News/index'
import { OrderDashboard, OrderDetail, UpdateOrder } from '../pages/AdminPages/Order'
import { ProductDashboard,AddProduct,UpdateProduct, ProductDetailInfo } from '../pages/AdminPages/Products/index'
import { UpdateUser, UserDashboard } from '../pages/AdminPages/User'

export const AdminSide = () => {
  return (
    <div>
      <AdminNav/>
     <div className="ml-[240px] p-5 md:ml-0 md:px-5">
     <Routes>
      <Route path='/' element={<AdminDashBoard/>}/>
      <Route path='/admin-thucdon' element={<MenuDashboard/>}/>
      <Route path='/admin-thucdon/them' element={<AddMenu/>}/>
      <Route path='/admin-thucdon/capnhat' element={<UpdateMenu/>}/>
      <Route path='/admin-sanpham' element={<ProductDashboard/>}/>
      <Route path='/admin-sanpham/:_id' element={<ProductDetailInfo/>}/>
      <Route path='/admin-sanpham/them' element={<AddProduct/>}/>
      <Route path='/admin-sanpham/capnhat' element={<UpdateProduct/>}/>
      <Route path='/admin-tintuc' element={<NewsDashboard/>}/>
      <Route path='/admin-tintuc/:_id' element={<NewsDetailInfo/>}/>
      <Route path='/admin-tintuc/them' element={<AddNews/>}/>
      <Route path='/admin-tintuc/capnhat' element={<UpdateNews/>}/>
      <Route path='/admin-lienhe' element={<ContactDashboard/>}/>
      <Route path='/admin-lienhe/them' element={<AddContact/>}/>
      <Route path='/admin-lienhe/capnhat' element={<UpdateContact/>}/>
      <Route path='/admin-nguoidung' element={<UserDashboard/>}/>
      <Route path='/admin-nguoidung/capnhat' element={<UpdateUser/>}/>
      <Route path='/admin-donhang' element={<OrderDashboard/>}/>
      <Route path='/admin-donhang/:_id' element={<OrderDetail/>}/>
      <Route path='/admin-donhang/capnhat' element={<UpdateOrder/>}/>
      </Routes>
     </div>
    </div>
  )
}
