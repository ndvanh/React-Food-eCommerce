import axios from "axios"

export interface AdminAcc{
  adminAccount : string,
  adminPassword : string,
}
const adminAPI = {
 // POST đăng nhập
 loginAdmin : (data:AdminAcc) => {
  const url = `${process.env.REACT_APP_API_URL}/api/admin/login`
  return axios.post(url,data)
 },
}
export default adminAPI