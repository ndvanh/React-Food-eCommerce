import { useContext } from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import {SearchProduct} from './index'
import { NavLink,Link } from 'react-router-dom'
import { UserLogin } from '../Login'

const PCNav = () => {
  const linkActive = ({isActive}:any) => ({
        color : isActive ? '#ff5e57' : ''
  })
  const {cartList} : any = useContext(FoodContext)
  return (
    <header className='bg-white sticky top-0 shadow z-10 lg:px-5'>
      <div className='max-w-[1200px] py-3 m-auto flex items-center'>
        <NavLink to='/'>
          <div className='flex items-center cursor-pointer mb-1'>
            <img alt="icon" className='h-[40px] w-[40px]' src={require('../../../assets/imgs/burger.png')}/>
            <span className='font-bold text-[25px] ml-2 text-maincolor'>Cloud Food</span> 
          </div>
        </NavLink>
        <div className="flex justify-between flex-1 ml-7 items-center">
          <div>
            <ul className="flex">
              <li className='cursor-pointer px-3 capitalize font-bold hover:text-maincolor text-maintext lg:text-[14px] duration-300'>
                <NavLink to='/thuc-don' style={linkActive}>Thực đơn</NavLink>
              </li>
              <li className='cursor-pointer px-3 capitalize font-bold hover:text-maincolor text-maintext lg:text-[14px] duration-300'>
              <NavLink to='/khuyen-mai' style={linkActive}>Khuyến mãi</NavLink>
              </li>
              <li className='cursor-pointer px-3 capitalize font-bold hover:text-maincolor text-maintext lg:text-[14px] duration-300'>
              <NavLink to='/tin-tuc' style={linkActive}>Tin tức</NavLink>
              </li>
              <li className='cursor-pointer px-3 capitalize font-bold hover:text-maincolor text-maintext lg:text-[14px] duration-300'>
              <NavLink to='/lien-he' style={linkActive}>Liên hệ</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul className='flex justify-end items-center'>
              <li className='cursor-pointer px-2'>
                <SearchProduct/>
              </li>
              <li className='cursor-pointer px-2 capitalize'>
                <UserLogin/>
              </li>
              <li className='cursor-pointer px-2 capitalize relative mr-[10px]'>
                <Link to='/gio-hang'><i className="fa-solid fa-cart-shopping text-maincolor text-[25px] lg:text-[18px]"></i></Link>
                <span className='absolute p-1 text-maincolor top-[-80%] text-[16x] lg:text-[14px]'>{cartList.length}</span>
              </li>
            </ul>
        </div>
        </div>
      </div>
    </header>
  )
}
export default PCNav