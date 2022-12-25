import { useState } from 'react'
import { AdminAcc } from '../../api/adminAPI'
import { UserAcc } from '../../api/userAPI'
import { LoginContext } from './LoginContext'

const LoginProvider = ({children}:any)  => {
  const [userInfo,setUserInfo] = useState<UserAcc>()
  const [userAcc,setUserAcc] = useState<UserAcc>(()=>{
    // @ts-ignore
    const savedAccount = JSON.parse(localStorage.getItem('user_account'))
    return savedAccount  || null
  })
  const [adminAcc,setAdminAcc] = useState<AdminAcc>(()=>{
    // @ts-ignore
    const savedAccount = JSON.parse(localStorage.getItem('admin_account'))
    return savedAccount  || null
  })
  const loginValue : any = {
    userInfo,setUserInfo,
    userAcc,setUserAcc,
    adminAcc,setAdminAcc,
  }
  return (
    <LoginContext.Provider value={loginValue}>
        {children}
    </LoginContext.Provider>
  )
}
export default LoginProvider