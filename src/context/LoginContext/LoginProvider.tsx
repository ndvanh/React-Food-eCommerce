import { useEffect, useState } from 'react'
import { AdminAcc } from '../../api/adminAPI'
import userAPI, { UserAcc } from '../../api/userAPI'
import { LoginContext } from './LoginContext'
import firebase from '../../service/firebase'

const LoginProvider = ({children}:any)  => {
  const [userInfo,setUserInfo] = useState<UserAcc>()
  const [userAcc,setUserAcc] = useState<UserAcc>(()=>{
    // @ts-ignore
    const savedAccount = JSON.parse(localStorage.getItem('user_account'))
    return savedAccount || null
  })
  const [adminAcc,setAdminAcc] = useState<AdminAcc>(()=>{
    // @ts-ignore
    const savedAccount = JSON.parse(localStorage.getItem('admin_account'))
    return savedAccount || null
  })
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        const loginWithGoogle = async () => {
          const userData : any = {
            userName: user?.displayName,
            phoneNumber:user?.phoneNumber,
            userMail: user?.email
          }
          setUserAcc(userData)
          const response = await userAPI.addUser(userData)
          if (response.status === 409) return false
          else return true
        }
        loginWithGoogle()
      }
      else return null
    })
    return () => unsubscribe()
  }, [setUserAcc])
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