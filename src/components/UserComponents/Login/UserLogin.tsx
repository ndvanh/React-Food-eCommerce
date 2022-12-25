import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "../../../context/LoginContext/LoginContext"

const UserLogin = () => {
  const {userAcc} : any = useContext(LoginContext)
  const [display,setDisplay] = useState<boolean>(false)
  const toggleDisplay = () => setDisplay(!display)
  const logOut = () => {
    localStorage.removeItem('user_account')
    localStorage.removeItem('product_list')
    window.location.reload()
  }
  return (
    <>
    {userAcc ? 
        <div className='relative' onClick={toggleDisplay}>
          <img 
            title= {userAcc?.userName}
            className='cursor-pointer h-[35px] w-[35px] lg:h-[24px] lg:w-[24px] rounded-full'
            src='https://static.vecteezy.com/system/resources/previews/005/559/915/original/cute-penguin-waving-hand-cartoon-icon-illustration-animal-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg' 
            alt={userAcc?.userName}/>
          {display && 
          <div className='bg-white w-[100px] 2lg:w-[80px] absolute py-3 px-2 shadow-md border-t-[1px] border-t-footercolor top-[120%]'>
            <ul className='text-maintext'>
              <li className='hover:underline 2lg:text-[12px]'>
                <Link to='/thong-tin'>Thông tin</Link>
              </li>
              <li className='hover:underline 2lg:text-[12px]' onClick={logOut}>
                  Đăng xuất 
              </li>
            </ul>
          </div>}  
        </div> : 
        <Link to='/dang-nhap'><i className="fa-solid fa-circle-user text-maincolor text-[25px]"></i></Link>
    }
    </>
  )
}
export default UserLogin