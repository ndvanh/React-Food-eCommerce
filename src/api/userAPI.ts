import axios from "axios"
import axiosClient from "./AxiosClient"

export interface UserAcc{
    _id: null,
    userName : string,
    phoneNumber : number,
    userMail : string,
    userPassword : string,
    createdAt:string,
    updatedAt:string
  }
export interface UserRes{
  pageSum:number,
  data : UserAcc[]
  }
export interface LoginAcc{
  userMail : string,
  userPassword : string,
}
const userAPI = {
  // GET lấy tất cả người dùng
 getAllUser : () : Promise<UserAcc[]>  => {
      const url = '/api/user'
      return axiosClient.get(url)
  },
  // GET lấy người dùng với phân trang
 getPageUser : (num : number) : Promise<UserRes>  => {
  const url = `/api/user?page=${num}`
  return axiosClient.get(url)
},
 // POST thêm người dùng (đăng ký)
 addUser : (data:UserAcc) => {
  const url = `${process.env.REACT_APP_API_URL}/api/user`
  return axios.post(url,data)
},
 // POST đăng nhập
 loginUser : (data:LoginAcc) => {
  const url = `${process.env.REACT_APP_API_URL}/api/user/login`
  return axios.post(url,data)
},
// PATCH cập nhật người dùng
 updateUser(data:UserAcc,id:string) {
  const url = `${process.env.REACT_APP_API_URL}/api/user/${id}`
  return axios.patch(url,data)
},
// DELETE xóa người dùng 
 delUser(data: any) {
  const url = `/api/user/delete/${data}`
  return axiosClient.delete(url)
}, 
}
export default userAPI