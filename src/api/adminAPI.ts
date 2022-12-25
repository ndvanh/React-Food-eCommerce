import axios from "axios"

export interface AdminAcc{
  adminAccount : string,
  adminPassword : string,
}
const adminAPI = {
 // POST đăng nhập
 loginAdmin : (data:AdminAcc) => {
  const url = `http://localhost:8080/api/admin/login`
  return axios.post(url,data)
 },
}
export default adminAPI