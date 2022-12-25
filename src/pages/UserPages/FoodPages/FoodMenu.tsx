import { useState,useEffect } from "react"
import { NavLink, Outlet} from "react-router-dom"
import menuAPI, { MenuItem } from "../../../api/menuAPI"

const FoodMenu = () => {
  const linkActive = ({isActive}:any) => ({
    color : isActive ? '#ff5e57' : '',
    fontWeight : isActive ? '600' : ''
  })
  const [menu,setMenu] = useState<MenuItem[]>([])
  useEffect(() =>{
    const getMenuItem = async () => {
      try{
         const response = await menuAPI.getMenuItem()
         setMenu(response)
      }
      catch(err){
        console.log('Không thể lấy danh sách menu',err)
      }
    }
    getMenuItem()
  },[])
  return (
    <>
     <section className='max-w-[1200px] m-auto'>
      <section className='grid grid-cols-7 gap-7 mt-10 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
      {menu?.map((item,index) => (
        <NavLink to={`/thuc-don/${item.menuType}`} key={item._id} style={linkActive}>
        <div className='flex flex-col items-center cursor-pointer'>
          <img className='h-[80px] w-[80px] object-cover rounded-[10px]' src={item.imgMenu} alt={item.menuType} loading='lazy'/>
          <span className='text-[16px] py-2'>{item.menuType}</span>
        </div>
        </NavLink>
      ))}
      </section>
      <section>
        <Outlet/>
      </section>
     </section>
    </>
  )
}
export default FoodMenu