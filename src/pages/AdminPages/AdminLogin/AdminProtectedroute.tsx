import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoginContext } from "../../../context/LoginContext/LoginContext"

const AdminProtectedroute = ({children} : any) => {
    const {adminAcc} : any = useContext(LoginContext)
    if (!adminAcc) return <Navigate to="/admin-dangnhap" replace />
    return children
}
export default AdminProtectedroute