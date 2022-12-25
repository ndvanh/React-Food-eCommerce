import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoginContext } from "../../../context/LoginContext/LoginContext"

const Protectedroute = ({children} : any) => {
    const {userAcc} : any = useContext(LoginContext)
    if (!userAcc) return <Navigate to="/dang-nhap" replace />
    return children
}
export default Protectedroute