import { useContext, useState } from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { NavLink,Link } from 'react-router-dom'
import { UserLogin } from "../Login"

const TabLetMobileNav = () => {
  const linkActive = ({isActive}:any) => ({
        color : isActive ? '#ff5e57' : ''
  })
  const {cartList} : any = useContext(FoodContext)
  const [displayNav,setDisplayNav] = useState<boolean>(false)
  const toggleDisplayNav = () => setDisplayNav(!displayNav)
  return (
    <section>
      <div className='px-5 py-3 shadow-md sticky top-0 z-10 bg-white'>
        <header className='flex justify-between items-center'>
          <div onClick={toggleDisplayNav}>
            <i className="fa-solid fa-bars text-maincolor text-[25px]"></i>
          </div>
          <div><Link to='/'><span className='font-bold text-[25px] ml-10 text-maincolor'>Cloud Food</span></Link></div>
          <div className='relative flex'>
            <div className='mr-2'><UserLogin/></div>
            <div>
              <Link to='/gio-hang'><i className="fa-solid fa-cart-shopping text-maincolor text-[25px] lg:text-[18px]"></i></Link>
              <span className='absolute p-1 text-maincolor top-[-80%] text-[16x] lg:text-[14px]'>{cartList.length}</span>
            </div>
          </div>
        </header>
      </div>
      {displayNav && 
      <nav className='bg-white absolute top-0 left-0 z-20 h-full w-full p-5 '>
        <div onClick={toggleDisplayNav}><i className="fa-solid fa-x text-maincolor text-[25px] float-right"></i></div>
        <div className='clear-right mt-10'>
          <ul className="flex flex-col items-center">
            <li onClick={toggleDisplayNav} className='cursor-pointer text-[20px] py-5 capitalize font-bold text-maintext'>
              <NavLink to='/thuc-don' style={linkActive}>Thực đơn</NavLink>
            </li>
            <li onClick={toggleDisplayNav} className='cursor-pointer text-[20px] py-5 capitalize font-bold text-maintext'>
            <NavLink to='/khuyen-mai' style={linkActive}>Khuyến mãi</NavLink>
            </li>
            <li onClick={toggleDisplayNav} className='cursor-pointer text-[20px] py-5 capitalize font-bold text-maintext'>
            <NavLink to='/tin-tuc' style={linkActive}>Tin tức</NavLink>
            </li>
            <li onClick={toggleDisplayNav} className='cursor-pointer text-[20px] py-5 capitalize font-bold text-maintext'>
            <NavLink to='/lien-he' style={linkActive}>Liên hệ</NavLink>
            </li>
          </ul>
        </div>
      </nav> }
    </section>
  )
}
export default TabLetMobileNav